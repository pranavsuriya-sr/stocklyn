import { PrismaClient } from "@prisma/client";
import express from "express";
import { VerifyJwtMiddleware } from "../../middleware/verify-jwt";

export const productRoute = express.Router();

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

productRoute.get("/info", VerifyJwtMiddleware, async (req, res) => {
  try {
    const allProductInfo = await prisma.products.findMany();
    res.status(200).json(allProductInfo);
  } catch (error) {
    res.json(error);
  }
});

productRoute.post("/productDetails", VerifyJwtMiddleware, async (req, res) => {
  const { productIds } = req.body;

  if (!productIds) {
    res.status(400).json({
      message:
        "Required feild is missing , ie productIds[] at /product/productDetails",
    });
    return;
  }

  try {
    const productDetails = await prisma.products.findMany({
      where: {
        id: { in: productIds },
      },
    });
    res.status(200).json(productDetails);
  } catch (error) {
    res.status(401).json(error.message);
  }
});

//enable jwtverification later
productRoute.post("/add", async (req, res) => {
  let {
    name,
    imageUrl,
    productDescription = "",
    category,
    price,
    details = "",
    highlights = [],
    stockQuantity = 0,
    colors,
    displayImage,
  } = req.body;

  if (!name || !category || !imageUrl || !price || !colors || !displayImage) {
    res.status(400).json({
      message:
        "Required feilds are missing , ie (id,name,imageUrl,category,imageUrl[],price,colors,displayImage) at /product/add",
    });
    return;
  }

  category = category.toLowerCase().trim();

  //checking if the category exists

  try {
    let categoryRecord = await prisma.category.findUnique({
      where: {
        name: category,
      },
    });

    const response = await prisma.products.create({
      data: {
        name,
        imageUrl,
        productDescription,
        category: {
          create: {
            name: category,
            description: "Devices and gadgets",
          },
        },
        price,
        details,
        highlights,
        reviews: 0,
        stockQuantity,
        colors,
        displayImage,
      },
    });

    res.status(201).json({ message: "Product added successfully", response });
  } catch (error) {
    res.status(500).json({ message: "Error at /product/add", error });
  }
});
