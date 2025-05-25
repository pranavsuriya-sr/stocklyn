import { Products } from "@prisma/client";
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
      },
    });
    res.status(200).send("Successfully inserted product" + insertProduct);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default addProductRoute;
