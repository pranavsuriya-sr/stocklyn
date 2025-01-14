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

productRoute.post("/productDetails", VerifyJwtMiddleware, async (req, res) => {
  const { products } = req.body;

  try {
    const productDetails = await prisma.products.findMany({
      where: {
        id: { in: products },
      },
    });
    res.status(200).json(productDetails);
  } catch (error) {
    res.status(401).json(error.message);
  }
});
