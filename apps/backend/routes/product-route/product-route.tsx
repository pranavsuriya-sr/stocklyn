import { PrismaClient } from "@prisma/client";
import express from "express";

export const productRoute = express.Router();

const prisma = new PrismaClient();

productRoute.get("/info", async (req, res) => {
  try {
    const allProductInfo = await prisma.products.findMany();
    res.status(200).json(allProductInfo);
  } catch (error) {
    res.json(error);
  }
});
