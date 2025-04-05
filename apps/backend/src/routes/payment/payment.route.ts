import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";

dotenv.config();

const paymentRoute = express.Router();
const secretKey = process.env.STRIPE_SECRET_KEY;

const stripe = new Stripe(secretKey);

paymentRoute.post("/create-checkout-session", async (req, res) => {
  const products = req.body;

  const lineItems = products.map((product: any) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: product.product.name,
          images: [product.product.displayImage],
        },
        unit_amount: Math.round(product.price) * 100,
      },
      quantity: product.quantity,
    };
  });
  // console.log(lineItems);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: process.env.SUCCESS_PAGE,
    cancel_url: process.env.FAILURE_PAGE,
  });

  res.status(200).send({ id: session.id });
  return;
});

export default paymentRoute;
