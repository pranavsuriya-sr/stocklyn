import express, { Request, Response } from "express";
import { VerifyJwtMiddleware } from "../../middleware/verify-jwt";
import { prisma } from "../../server";

const cartRoute = express.Router();

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

    //update it
    try {
      const cartInfo = await prisma.cart.update({
        where: { id: cartId },
        data: {},
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
