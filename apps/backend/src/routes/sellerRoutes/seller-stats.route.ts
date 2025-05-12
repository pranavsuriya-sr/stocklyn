import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const sellerStatsRoute = express.Router();
const prisma = new PrismaClient({
  log: ["error"],
});

sellerStatsRoute.get(
  "/sellerStats/:sellerId",
  async (req: Request, res: Response) => {
    const sellerId = req.params.sellerId;

    const totalProducts = await prisma.products.count({
      where: { sellerId: sellerId },
    });

    const totalOrders = await prisma.orderItems.count({
      where: { sellerId: sellerId },
    });

    res.status(200).json({ totalProducts, totalOrders });
  }
);

// sellerStatsRoute.post(
//   "/sellerStats/:sellerId",
//   async (req: Request, res: Response) => {
//     const sellerId = "";

//     const resposne = await prisma.orderItems.updateMany({
//       where: {
//         sellerId: null,
//       },
//       data: {
//         sellerId: sellerId,
//       },
//     });

//     res.status(200).json({ resposne });
//   }
// );

export default sellerStatsRoute;
