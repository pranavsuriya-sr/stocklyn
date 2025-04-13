import express, { Request, Response } from "express";
import { prisma } from "../../server";

const orderRoute = express.Router();

orderRoute.get("/getOrder/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const ordersDetail = await prisma.order.findMany({
      where: {
        userId: userId,
      },
      include: {
        OrderItems: true,
      },
    });
    console.log(ordersDetail);

    res.status(200).send(ordersDetail);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default orderRoute;
