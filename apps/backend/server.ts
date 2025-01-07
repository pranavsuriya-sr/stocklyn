import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";
import { productRoute } from "./routes/product-route/product-route";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use("/product", productRoute);

const PORT = 5000;

app.get("/", async (req, res) => {
  try {
    const userDetails = await prisma.$queryRaw`SELECT * FROM auth.users`;

    res.send(userDetails);
  } catch (error) {}
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
