import dotenv from "dotenv";
import { Request, Response } from "express";
import Stripe from "stripe";
import { prisma } from "../../server";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

const webhookHandler = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];
  let stripeEvent: Stripe.Event;
  // console.log(process.env.STRIPE_SECRET_KEY);

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.WEBHOOK_SECRET!
    );
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  console.log("Webhook event received");

  //succesful payment

  if (stripeEvent.type === "checkout.session.completed") {
    const session = stripeEvent.data.object;

    const userId = session.metadata?.userId;
    const totalAmount = session.metadata?.totalAmount;

    if (userId) {
      //should create a order detail in the table , this should be done after payment is successful --- pending status
      // flow : find cart by userId --> find the cartItems by cartId --> create order with the cartItems and metadata from the payment

      try {
        const cartDetails = await prisma.cart.findUnique({
          where: {
            userId: userId,
          },
        });

        if (!cartDetails) {
          console.error(
            "Cart is Empty and details not found for user:",
            userId
          );
          res.status(404).json({ error: "Order/Cart details not found" });
          return;
        }

        const cartItems = await prisma.cartItems.findMany({
          where: {
            cartId: cartDetails.id,
          },
        });
        if (!cartItems || cartItems.length === 0) {
          console.error("No cart items found for user:", userId);
          res.status(404).json({ error: "Cart items not found" });
          return;
        }

        const orderInformation = await prisma.order.create({
          data: {
            userId: userId,
            total: totalAmount,
          },
        });
        const sellerIds = await prisma.products.findMany({
          where: {
            id: {
              in: cartItems.map((item) => item.productId),
            },
          },
        });

        const orderItemsData = cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          orderId: orderInformation.id,
          sellerId: sellerIds.find((seller) => seller.id === item.productId)
            ?.sellerId,
        }));

        await prisma.orderItems.createMany({
          data: orderItemsData,
        });

        //now update the stockQuantity in the products table
        await prisma.products.updateMany({
          where: {
            id: { in: cartItems.map((item) => item.productId) },
          },
          data: {
            stockQuantity: {
              decrement: cartItems.reduce(
                (acc, item) => acc + item.quantity,
                0
              ),
            },
          },
        });

        //now update the soldProducts in the products table
        await prisma.products.updateMany({
          where: {
            id: { in: cartItems.map((item) => item.productId) },
          },
          data: {
            soldProducts: {
              increment: cartItems.reduce(
                (acc, item) => acc + item.quantity,
                0
              ),
            },
          },
        });
      } catch (error) {
        console.error("Failed to update user:", error);
        res.status(500).json({
          error: "Failed to update user but your payment was successful",
        });
        return;
      }

      try {
        const cartId = await prisma.cart.findFirst({
          where: {
            userId: userId,
          },
        });
        if (!cartId) {
          console.error("Cart not found for user:", userId);
          res.status(404).json({ error: "Cart not found" });
          return;
        }
        await prisma.cartItems.deleteMany({
          where: {
            cartId: cartId.id,
          },
        });
      } catch (error) {
        console.error("Failed to delete cart items:", error);
        res.status(500).json({ error: "Failed to clear cart items" });
        return;
      }
    }
  }

  res.status(200).json({ received: true });
};

export default webhookHandler;
