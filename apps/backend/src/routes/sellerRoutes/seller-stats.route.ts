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
    const orders = await prisma.orderItems.findMany({
      where: { sellerId: sellerId },
      include: {
        order: true,
      },
    });
    const recentOrder = await prisma.orderItems.findFirst({
      where: { sellerId: sellerId },
      include: { product: true, order: true },
      orderBy: { order: { createdAt: "desc" } },
    });

    //top performing products by quantity
    const topProductsByQuantity = await prisma.orderItems.groupBy({
      by: ["productId"],
      where: { sellerId: sellerId },
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },

      take: 5,
    });
    //getting its ids
    const productIds = topProductsByQuantity.map((item) => item.productId);
    //getting the products details
    const productDetailsArray = await prisma.products.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    const productDetailsMap = new Map(
      productDetailsArray.map((p) => [p.id, p])
    );

    const combinedTopProducts = topProductsByQuantity.map((item) => {
      const product = productDetailsMap.get(item.productId);
      return {
        productId: item.productId,
        name: product?.name || "Unknown Product",
        stockQuantity:
          product?.stockQuantity === undefined ? 0 : product.stockQuantity,
        totalQuantitySold: item._sum.quantity === null ? 0 : item._sum.quantity,
        image: product?.imageUrl[0],
        price: product?.price,
      };
    });

    const totalCost = orders.reduce((acc, order) => {
      return acc + Number(order.order.total);
    }, 0);

    const totalCountOfItemsSold = totalItemsSold._sum.quantity;

    res.status(200).json({
      totalProducts,
      totalOrders,
      totalCountOfItemsSold,
      totalCost,
      recentOrder,
      topPerformingProducts: combinedTopProducts,
    });
  }
);

sellerStatsRoute.get(
  "/sellerStats/sellerOrders/:sellerId",
  async (req: Request, res: Response) => {
    const sellerId = req.params.sellerId;

    const orders = await prisma.orderItems.findMany({
      where: { sellerId: sellerId },
      include: {
        order: true,
      },
      orderBy: {
        order: {
          createdAt: "desc",
        },
      },
    });

    const products = await prisma.products.findMany({
      where: { id: { in: orders.map((order) => order.productId) } },
    });

    const productMap = new Map(
      products.map((product) => [product.id, product])
    );

    const orderDetails = orders.map((order) => {
      return {
        order,
        product: productMap.get(order.productId) || null,
      };
    });

    res.status(200).json({ orderDetails });
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
