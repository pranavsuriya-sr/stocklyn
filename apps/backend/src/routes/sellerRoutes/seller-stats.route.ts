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

    const totalItemsSold = await prisma.orderItems.aggregate({
      where: { sellerId: sellerId },
      _sum: {
        quantity: true,
      },
    });

    const totalCountOfItemsSold = totalItemsSold._sum.quantity;

    res.status(200).json({ totalProducts, totalOrders, totalCountOfItemsSold });
  }
);

// sellerStatsRoute.post(
//   "/sellerStats/:sellerId",
//   async (req: Request, res: Response) => {
//     const sellerId = "cmai1dmbs0005wvr36bcyz2hw";

//     const resposne = await prisma.orderItems.updateMany({
//       where: {
//         sellerId: sellerId,
//       },
//       data: {
//         sellerId: sellerId,
//       },
//     });

//     res.status(200).json({ resposne });
//   }
// );

export default sellerStatsRoute;
