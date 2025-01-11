import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import express from "express";
import { VerifyJwtMiddleware } from "../../middleware/verify-jwt";
import { GenerateJwtToken } from "../../service/jwt";
import { userType } from "../../types/jwt";

const authRoute = express.Router();

const prismaClient = new PrismaClient();

authRoute.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }
  if (password.length < 6) {
    res.status(400).json({
      error: "Password must be at least 6 characters long",
    });
    return;
  }

  try {
    const existingUser = await prismaClient.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(409).json({
        error: "Email already registered",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = await prismaClient.users.create({
      data: {
        name,
        email,
        hashedPassword: hashedPassword,
        profileUrl: "",
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    const token = GenerateJwtToken(userData);

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });

    res.status(201).json(userData);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        res.status(409).json({
          error: "A user with this email already exists",
        });
        return;
      }
    }

    res.status(500).json({
      error: "Failed to create user",
    });
    return;
  } finally {
    await prismaClient.$disconnect();
  }
});

authRoute.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    res.status(400).json({
      error: "Missing required fields",
    });
    return;
  }

  try {
    const user = await prismaClient.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.status(404).json({
        error: "User not found",
      });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordMatch) {
      res.status(401).json({
        error: "Invalid Credentials",
      });
      return;
    }

    const userData: userType = {
      name: user.name,
      email: user.email,
    };

    const token = GenerateJwtToken(userData);

    res.cookie("authToken", token, {
      httpOnly: true,
    });

    res.status(200).json({
      message: "Login successful!",
      userData,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        res.status(409).json({
          error: "A user with this email doesnt exist",
        });
        return;
      }
    }

    res.status(500).json({
      error: error.message,
    });
    return;
  } finally {
    await prismaClient.$disconnect();
  }
});

authRoute.get("/isVerified", VerifyJwtMiddleware, (req, res) => {
  res.status(200).json({ message: "Token is valid", user: req.user });
});

export default authRoute;
