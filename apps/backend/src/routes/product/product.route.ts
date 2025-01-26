import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import { VerifyJwtMiddleware } from "../../middleware/verify-jwt";

const productRoute = express.Router();

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

productRoute.get("/individualProduct/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      message:
        "Required feild is missing , ie productId at /product/individualProduct",
    });
    return;
  }

  try {
    const response = await prisma.products.findUnique({
      where: {
        id: id,
      },
    });

    res.status(201).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error at /product/individualProduct", error });
  }
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
    categoryDescription,
    category,
    price,
    details = "",
    highlights = [],
    stockQuantity,
    colors,
    displayImage,
    sizes,
  } = req.body;

  if (stockQuantity <= 10) {
    res.status(400).json({
      message: "Stock should be atleast more than 10",
    });
    return;
  }

  if (
    !name ||
    !category ||
    !imageUrl ||
    !price ||
    !colors ||
    !displayImage ||
    !stockQuantity
  ) {
    res.status(400).json({
      message:
        "Required feilds are missing , ie (id,name,imageUrl,category,imageUrl[],price,colors,displayImage) at /product/add",
    });
    return;
  }

  name = name.trim().substring(0, 30);
  category = category.toLowerCase().trim();

  //checking if the category exists

  try {
    let categoryRecord = await prisma.category.findFirst({
      where: {
        name: category,
      },
    });

    if (!categoryRecord) {
      if (!categoryDescription) {
        res.status(400).json({
          message:
            "Required feilds are missing , ie. categoryDescription (since the category doesnt exist) at /product/add",
        });
        return;
      }

      await prisma.category.create({
        data: {
          name: category,
          description: "Best category",
        },
      });
    }

    const response = await prisma.products.create({
      data: {
        name,
        imageUrl,
        productDescription,
        category: {
          //fix this error
          connect: {
            id: categoryRecord.id,
          },
        },
        price,
        sizes,
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

productRoute.get("/getbycategory", async (req: Request, res: Response) => {
  const { category } = req.query;

  if (!category) {
    res.status(400).json({
      message:
        "Required feilds are missing , ie. category (since the category doesnt exist) at /product/getbycategory",
    });
    return;
  }

  try {
    const isCategoryValid = await prisma.category.findUnique({
      where: {
        name: category as string,
      },
    });

    if (!isCategoryValid) {
      res.status(404).json({
        message: `There is no such category as ${category} at /product/getbycategory`,
      });
      return;
    }

    const categoryProducts = await prisma.products.findMany({
      where: {
        categoryName: category as string,
      },
    });

    res.status(201).json({
      message: "Products by category fetched successfully.",
      categoryProducts,
    });
  } catch (error) {
    res.status(500).json({ message: "Error at /product/getbycategory", error });
  }
});

export default productRoute;
