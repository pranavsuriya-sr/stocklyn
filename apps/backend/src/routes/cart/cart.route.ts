import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import { VerifyJwtMiddleware } from "../../middleware/verify-jwt";

const cartRoute = express.Router();
const prismaClient = new PrismaClient();

cartRoute.post(
  "/add",
  VerifyJwtMiddleware,
  async (req: Request, res: Response) => {
    const { productId, cartId } = req.body;

    try {
      const cartInfo = await prismaClient.cart.update({
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
        error: "An error occurred while adding the product to the cart.",
      });
    }
  }
);

cartRoute.post("/get", VerifyJwtMiddleware, async (req, res) => {
  const { cartId } = req.body;

  try {
    const cartInfo = await prismaClient.cart.findUnique({
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
    res.status(500).send({
      error: "An error occurred while fetching the cart information.",
    });
  }
});

export default cartRoute;
