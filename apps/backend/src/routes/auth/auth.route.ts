import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import express from "express";

const authRoute = express.Router();
const prismaClient = new PrismaClient();

authRoute.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.send(400).json({ error: "Missing required fields" });
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

    res.status(201).send(user);
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

export default authRoute;
