import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import addressRoute from "./routes/address/address.route";
import authRoute from "./routes/auth/auth.route";
import cartItemRoute from "./routes/cart-item/cart-item.route";
import cartRoute from "./routes/cart/cart.route";
import categoryRoute from "./routes/category/category.route";
import orderRoute from "./routes/order/order.route";
import paymentRoute from "./routes/payment/payment.route";
import productRoute from "./routes/product/product.route";
import webhookHandler from "./routes/webhook/webhook.route";
import { AuthenticatedRequest } from "./types/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedRequest;
    }
  }
}
export const prisma = new PrismaClient({
  log: ["error"],
});
dotenv.config();

const app = express();

app.post(
  "/payment/webhook",
  express.raw({ type: "application/json" }),
  webhookHandler
);

// const allowedOrigins = ["http://localhost:5173", "https://maalelo.vercel.app"];

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://maalelo.vercel.app"
        : "http://localhost:5173",
    credentials: true,
  })
);

//testing purpose
app.get("/", (req, res) => {
  res.json("cookie Test Success!");
});

app.use(express.json());
app.use(cookieParser());
app.use("/cart", cartRoute);
app.use("/product", productRoute);
app.use("/auth", authRoute);
app.use("/category", categoryRoute);
app.use("/cartitem", cartItemRoute);
app.use("/address", addressRoute);
app.use("/payment", paymentRoute);
app.use("/order", orderRoute);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
