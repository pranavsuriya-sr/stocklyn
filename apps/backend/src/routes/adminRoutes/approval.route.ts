import { Router } from "express";
import { VerifyJwtMiddleware } from "../../middleware/verify-jwt";
import { prisma } from "../../server";

const adminApprovalRoute = Router();

adminApprovalRoute.get("/category", VerifyJwtMiddleware, async (req, res) => {
  try {
    const categories = await prisma.categoryRequest.findMany({
      where: {
        status: "pending",
      },
      include: {
        user: true,
      },
    });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

adminApprovalRoute.patch(
  "/category/:id",
  VerifyJwtMiddleware,
  async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const category = await prisma.categoryRequest.update({
        where: { id: id as string },
        data: { status },
      });

      if (status === "approved") {
        await prisma.category.create({
          data: {
            name: category.categoryName,
            description: category.reason,
          },
        });

        await prisma.categoryRequest.delete({
          where: { id: id as string },
        });
      }

      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

adminApprovalRoute.get(
  "/unapprovedSellers",
  VerifyJwtMiddleware,
  async (req, res) => {
    try {
      const sellerApproval = await prisma.sellerApproval.findMany({
        where: {
          status: "pending",
        },
      });
      res.status(200).json(sellerApproval);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

adminApprovalRoute.patch(
  "/seller/:id",
  VerifyJwtMiddleware,
  async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const seller = await prisma.sellerApproval.update({
        where: { id: id as string },
        data: { status },
      });

      if (status === "approved") {
        await prisma.users.create({
          data: {
            name: seller.name,
            email: seller.email,
            hashedPassword: seller.hashedPassword,
            profileUrl: "",
            role: "seller",
            cart: {
              create: {},
            },
          },
        });

        await prisma.sellerApproval.delete({
          where: { id: id as string },
        });
      }

      res.status(200).json(seller);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
export default adminApprovalRoute;
