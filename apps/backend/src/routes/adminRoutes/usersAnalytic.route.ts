import { Router } from "express";
import { VerifyJwtMiddleware } from "../../middleware/verify-jwt";
import { prisma } from "../../server";

const adminUserAnalyticsRoute = Router();

adminUserAnalyticsRoute.get(
  "/analytics/:userId",
  VerifyJwtMiddleware,
  async (req, res) => {
    const userId = req.params.userId;

    const admin = await prisma.users.findFirst({
      where: {
        id: userId,
      },
    });

    if (!admin) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      const userCount = await prisma.users.count();
      const sellerCount = await prisma.users.count({
        where: {
          role: "seller",
        },
      });

      const buyerCount = await prisma.users.count({
        where: {
          role: "buyer",
        },
      });

      const newSignups = await prisma.users.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setDate(new Date().getDate() - 7)),
          },
        },
      });

      const activeUsers24h = await prisma.users.count({
        where: {
          updatedAt: {
            gte: new Date(new Date().setDate(new Date().getDate() - 1)),
          },
        },
      });
      const activeUsers7d = await prisma.users.count({
        where: {
          updatedAt: {
            gte: new Date(new Date().setDate(new Date().getDate() - 7)),
          },
        },
      });
      res.status(200).json({
        userCount,
        sellerCount,
        buyerCount,
        newSignups,
        activeUsers24h,
        activeUsers7d,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default adminUserAnalyticsRoute;
