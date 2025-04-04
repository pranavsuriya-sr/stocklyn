import express from "express";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51PSzU1FQzSEBZEvhWhz0lrAv3oCxzEigUsxV3A0Cp7lCnazG5CNlwBTkFF31s9gY40PxsdyEDDpmgNPZ9ULe8HB8000Tqzs1Eb"
);

const paymentRoute = express.Router();

paymentRoute.post("/create-checkout-session", async (req, res) => {
  const products = req.body;
  console.log(products);

  const lineItems = products.map((product: any) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: product.name,
        },
        unit_amount: Math.round(product.price) * 100,
      },
      quantity: product.stockQuantity,
    };
  });
  // console.log(lineItems);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:5173/about`,
    cancel_url: `http://localhost:5173/contact`,
  });

  res.status(200).send({ id: session.id });
  return;
});

export default paymentRoute;
