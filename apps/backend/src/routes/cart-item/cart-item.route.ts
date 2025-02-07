import express, { Request, Response } from "express";
import { prisma } from "../../server";

const cartItemRoute = express.Router();

cartItemRoute.get("/items/:cartId", async (req: Request, res: Response) => {
  const { cartId } = req.params;

  try {
    const cart = await prisma.cart.findUnique({
      where: {
        id: cartId,
      },
    });

    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    const response = await prisma.cartItems.findMany({
      where: {
        cartId,
      },
      include: {
        product: true,
      },
    });

    res.status(200).json({ message: "Success", response });
  } catch (error) {
    res.status(500).json({ message: "Error at /cartitem/:cartId", error });
  }
});

cartItemRoute.post("/insert", async (req: Request, res: Response) => {
  const { cartId, productId, price } = req.body;

  if (!cartId || !productId || !price) {
    res.status(400).json({
      message:
        "Required feilds missing ie: productId or cartId or price at /cartitem/insert",
    });
    return;
  }

  try {
    const response = await prisma.cartItems.create({
      data: {
        cartId,
        productId,
        price,
      },
    });

    res
      .status(201)
      .json({ message: "Success! Item added in the cartItem ", response });
  } catch (error) {
    res.status(500).json({ message: "Error at /cartItem/insert", error });
  }
});

cartItemRoute.delete("/delete", async (req: Request, res: Response) => {
  const { productId, cartId } = req.body;

  if (!cartId || !productId) {
    res.status(400).json({
      message:
        "Required feilds missing ie: productId or cartId or price at /cartitem/insert",
    });
    return;
  }

  try {
    const response = await prisma.cartItems.delete({
      where: {
        cartId_productId: {
          cartId: cartId,
          productId: productId,
        },
      },
    });

    res.status(200).json({ message: "Deleted successfully", response });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete CartItem", error });
  }
});

cartItemRoute.put("/updateQuantity", async (req: Request, res: Response) => {
  let { cartItemId, quantity } = req.body;

  quantity = Number(quantity);

  if (!cartItemId || !quantity) {
    res.status(400).json({
      message:
        "Required feilds missing ie: productId or cartId or quantity at /cartitem/updateQuantity",
    });
    return;
  }

  try {
    const isCartItemIdValid = await prisma.cartItems.findFirst({
      where: {
        id: cartItemId,
      },
    });

    if (!isCartItemIdValid) {
      res
        .status(400)
        .json("Invalid cartItemId . Not found at /cartitem/updateQuantity");
      return;
    }

    const response = await prisma.cartItems.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity: quantity,
      },
    });
    res.status(200).json({ message: "Updated", response });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete cartItem", error });
  }
});

export default cartItemRoute;
