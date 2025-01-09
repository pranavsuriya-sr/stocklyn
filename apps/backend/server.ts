import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";
import { productRoute } from "./routes/product/product.route";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use("/product", productRoute);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
