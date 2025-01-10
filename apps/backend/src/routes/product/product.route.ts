import { PrismaClient } from "@prisma/client";
import express from "express";
import { VerifyJwtMiddleware } from "../../middleware/verify-jwt";

export const productRoute = express.Router();

const prisma = new PrismaClient();

productRoute.get("/info", VerifyJwtMiddleware, async (req, res) => {
  try {
    const allProductInfo = await prisma.products.findMany();
    res.status(200).json(allProductInfo);
  } catch (error) {
    res.json(error);
  }
});
