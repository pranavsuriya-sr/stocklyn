import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Router } from "express";
import { GenerateJwtToken } from "../../service/jwt";
import { userType } from "../../types/jwt";

const prisma = new PrismaClient();

const adminRoute = Router();

adminRoute.post("/register", async (req, res) => {
  try {
    const admins = await prisma.users.findMany({
      where: {
        role: "admin",
      },
    });
    if (admins.length >= 1) {
      res.status(400).json({ message: "Maximum number of admins reached" });
      return;
    }

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const admin = await prisma.users.findFirst({
      where: { email },
    });

    if (admin) {
      res.status(400).json({ message: "Admin already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        name,
        email,
        hashedPassword,
        role: "admin",
        profileUrl: "",
        cart: {
          create: {},
        },
      },
      include: { cart: true },
    });

    user.hashedPassword = "";

    const token = GenerateJwtToken(user);

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // ---->  7 days session
    });
    res.status(201).json({ message: "Admin created successfully", user });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
});

adminRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  const user = await prisma.users.findFirst({
    where: {
      email,
    },
    include: { cart: true },
  });

  if (!user) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  if (user.role !== "admin") {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

  if (!passwordMatch) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const userData: userType = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const token = GenerateJwtToken(userData);

  user.hashedPassword = "";
  res.cookie("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // ---->  7 days session
  });
  res.status(200).json({ message: "Login successful", user });
});

adminRoute.post("/logout", (req, res) => {
  res.cookie("authToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logout successful" });
});

export default adminRoute;
