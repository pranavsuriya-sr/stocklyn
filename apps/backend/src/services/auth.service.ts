import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { GenerateJwtToken, userType } from "./jwt.service";

const prisma = new PrismaClient();

export class AuthService {
  static async signup(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        name,
        email,
        hashedPassword,
        profileUrl: "",
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return user;
  }

  static async login(email: string, password: string) {
    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    const userData: userType = { name: user.name, email: user.email };
    const token = GenerateJwtToken(userData);

    return { userData, token };
  }
}
