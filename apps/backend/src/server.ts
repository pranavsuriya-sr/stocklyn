import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";
import authRoute from "./routes/auth/auth.route";
import { productRoute } from "./routes/product/product.route";

const app = express();

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use("/product", productRoute);
app.use("/auth", authRoute);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
