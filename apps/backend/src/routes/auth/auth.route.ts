import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import express, { Request, Response } from "express";
import { VerifyJwtMiddleware } from "../../middleware/verify-jwt";
import { GenerateJwtToken } from "../../service/jwt";
import { userType } from "../../types/jwt";

const authRoute = express.Router();
const prismaClient = new PrismaClient();

authRoute.post("/signup", async (req: Request, res: Response) => {
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

    const user = await prismaClient.users.create({
      data: {
        name,
        email,
        hashedPassword,
        profileUrl: "",
        cart: {
          create: {
            products: [],
          },
        },
      },
      include: { cart: true },
    });

    user.hashedPassword = "";

    const token = GenerateJwtToken(user);

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // ---->  7 days session
    });

    res.status(201).json({
      message: "Login successful!",
      user,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Failed to create user" });
  } finally {
    await prismaClient.$disconnect();
  }
});

authRoute.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    const user = await prismaClient.users.findUnique({
      where: { email },
      include: { cart: true },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const userData: userType = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = GenerateJwtToken(userData);

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    user.hashedPassword = "";

    res.status(200).json({
      message: "Login successful!",
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  } finally {
    await prismaClient.$disconnect();
  }
});

authRoute.post("/logout", (req: Request, res: Response) => {
  res.cookie("authToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

authRoute.get(
  "/isVerified",
  VerifyJwtMiddleware,
  (req: Request, res: Response) => {
    res.status(200).json({ message: "Token is valid", user: req.user });
  }
);

authRoute.post(
  "/getinfo",
  VerifyJwtMiddleware,
  async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
      const user = await prismaClient.users.findFirst({
        where: { id },
        include: { cart: true },
      });
      res.status(201).json({ message: "fetched user detaisl", user });
    } catch (error) {
      console.error("fetching user at /getInfo error:", error);
      res.status(500).json({ error: "fetching info failed" });
    } finally {
      await prismaClient.$disconnect();
    }
  }
);

export default authRoute;
