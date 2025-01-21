import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import { VerifyJwtMiddleware } from "../../middleware/verify-jwt";

const cartRoute = express.Router();
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});
cartRoute.post(
  "/add",
  VerifyJwtMiddleware,
  async (req: Request, res: Response) => {
    const { productId, cartId } = req.body;

    if (!productId || !cartId) {
      res.status(400).json({
        message: "Required feilds missing ie: productId or cartId at /cart/add",
      });
      return;
    }

    try {
      const cartInfo = await prisma.cart.update({
        where: { id: cartId },
        data: {
          products: {
            push: productId,
          },
        },
      });

      res.status(200).send(cartInfo);
    } catch (error) {
      res.status(500).send({
        error,
      });
    }
  }
);

cartRoute.post("/getids", VerifyJwtMiddleware, async (req, res) => {
  const { cartId } = req.body;

  if (!cartId) {
    res
      .status(400)
      .json({ message: "Required feilds missing ie: cartId at /cart/getids" });
    return;
  }

  try {
    const cartInfo = await prisma.cart.findUnique({
      where: { id: cartId },
      select: {
        products: true,
      },
    });
    res.json({
      message: "Fetched the products successfully",
      cartInfo,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the cart information.",
      error,
    });
  }
});

export default cartRoute;
