import express, { Request, Response } from "express";
import multer from "multer";

const addProductRoute = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

addProductRoute.post(
  "/uploadImage",
  upload.single("file"),
  async (req, res) => {
    //@ts-ignore
    const file = req.file;
    console.log(file);
    res.send({ file: file.path });
  }
);

addProductRoute.get("/testRoute", async (req: Request, res: Response) => {
  res.send("Hello World");
});

export default addProductRoute;
