import { CategoryRequest, Products } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import express, { Request, Response } from "express";
import multer from "multer";
import { prisma } from "../../server";

const addProductRoute = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

addProductRoute.post(
  "/uploadImage",
  upload.single("file"),
  async (req, res) => {
    //@ts-ignore
    const file = req.file;
    // const filePath = `product.images/${file.originalname}`;
    // console.log(file);

    try {
      const { data, error } = await supabase.storage
        .from("product.images")
        .upload(file.originalname, file.buffer, {
          contentType: file.mimetype,
          upsert: true,
        });

      if (error) {
        res.send(error);
      }

      const { data: publicUrl } = supabase.storage
        .from("product.images")
        .getPublicUrl(file.originalname);

      //   console.log(publicUrl.publicUrl);
      res.status(200).send({ publicUrl: publicUrl.publicUrl });
    } catch (error) {
      res.send(error);
    }
  }
);

addProductRoute.post("/InsertProduct", async (req: Request, res: Response) => {
  const {
    name,
    categoryName,
    sellerId,
    details,
    productDescription,
    stockQuantity,
    displayImage,
    highlights,
    imageUrl,
    price,
  }: Products = req.body;

  const otherCategoryName = req.body.otherCategoryName;
  let currentCategory = null;

  //sellerId validation
  if (!sellerId) {
    res.status(400).send("Seller ID is required");
    return;
  }

  try {
    await prisma.users.findUnique({
      where: {
        id: sellerId,
      },
    });
  } catch (error) {
    res
      .status(500)
      .send("Error at sellerId validation in submitting product form" + error);
  }

  // category validation
  if (!categoryName) {
    let category = await prisma.category.findUnique({
      where: {
        name: otherCategoryName,
      },
    });
    if (!category) {
      const newCategory = await prisma.category.create({
        data: {
          name: otherCategoryName,
          description: "This is a new category",
        },
      });
      category = newCategory;
    }
    currentCategory = category;
  }

  //displayImage validation
  if (!displayImage) {
    res.status(400).send("Display Image is required");
    return;
  }

  try {
    const insertProduct = await prisma.products.create({
      data: {
        name,
        categoryName: currentCategory?.name || categoryName,
        sellerId,
        details,
        productDescription,
        stockQuantity,
        displayImage,
        highlights,
        imageUrl,
        price,
        colors: [],
      },
    });
    res.status(200).send(insertProduct);
  } catch (error) {
    res.status(500).send(error);
  }
});

addProductRoute.post(
  "/requestCategory",
  async (req: Request, res: Response) => {
    const { id, categoryName, reason, estimatedProducts }: CategoryRequest =
      req.body;

    if (!id || !categoryName || !reason || !estimatedProducts) {
      res.status(400).send("All fields are required");
      return;
    }

    const getSellerInfo = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });

    if (getSellerInfo.role !== "seller") {
      res.status(400).send("You are not a seller");
      return;
    }

    const categoryExists = await prisma.category.findUnique({
      where: {
        name: categoryName,
      },
    });

    if (categoryExists) {
      res.status(400).send("Requested category already exists");
      return;
    }

    const existingCategoryRequest = await prisma.categoryRequest.findFirst({
      where: {
        categoryName: categoryName,
        userId: id,
      },
    });

    if (existingCategoryRequest) {
      res.status(400).send("Category request already exists");
      return;
    }

    try {
      const newCategoryRequest = await prisma.categoryRequest.create({
        data: {
          categoryName,
          reason,
          estimatedProducts: Number(estimatedProducts),
          status: "pending",
          userId: id,
        },
      });
      res.status(200).send(newCategoryRequest);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

export default addProductRoute;
