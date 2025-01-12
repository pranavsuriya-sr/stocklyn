import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../types/jwt";

export const VerifyJwtMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.authToken;

  if (!token) {
    res.status(401).json({ error: "Authentication token is missing" });
    return;
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  try {
    const decoded = jwt.verify(token, secret) as AuthenticatedRequest;
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification failed:", (error as Error).message);
    res.status(403).json({ error: "Invalid or expired token" });
  }
};
