import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";
dotenv.config();

const secretKey = process.env.STRIPE_SECRET_KEY;

const paymentRoute = express.Router();

const stripe = new Stripe(secretKey);

paymentRoute.post("/create-checkout-session", async (req, res) => {
  const products = req.body;

  const lineItems = products.map((product: any) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: product.product.name,
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
    success_url: `http://localhost:5173/about`, // should change this after the success page is created
    cancel_url: `http://localhost:5173/contact`,
  });

  res.status(200).send({ id: session.id });
  return;
});

export default paymentRoute;
