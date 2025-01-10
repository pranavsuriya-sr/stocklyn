import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        res
          .status(409)
          .json({ error: "A user with this email already exists" });

        return;
      case "P2025":
        res.status(404).json({ error: "User not found" });
        return;
      default:
        res.status(500).json({ error: "Database error occurred" });
        return;
    }
  }

  res.status(500).json({
    error: "Internal server error",
    message: error.message || "Error message",
  });
};
