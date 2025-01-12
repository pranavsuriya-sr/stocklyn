import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoute from "./routes/auth/auth.route";
import { productRoute } from "./routes/product/product.route";
import { AuthenticatedRequest } from "./types/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedRequest;
    }
  }
}

const app = express();
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/product", productRoute);
app.use("/auth", authRoute);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
