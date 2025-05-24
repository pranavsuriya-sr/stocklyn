import { createClient } from "@supabase/supabase-js";
import express, { Request, Response } from "express";
import multer from "multer";

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
  res.send("Hello World");
});

export default addProductRoute;
