import express, { Request, Response } from "express";
import { prisma } from "../../server";

const categoryRoute = express.Router();

categoryRoute.get("/allcategory", async (req: Request, res: Response) => {
  try {
    const response = await prisma.category.findMany({ select: { name: true } });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error at /category/allcategory", error });
  }
});

categoryRoute.post("/categoryitems", async (req: Request, res: Response) => {
  const { category } = req.body;

  if (!category) {
    res.status(400).json({
      message:
        "Required feild is missing , ie: category at /category/categoryitems",
    });
  }

  try {
    const response = await prisma.category.findMany({
      where: {
        name: category,
      },
      take: 4,
    });

    res
      .status(200)
      .json({ message: " Success in fetching the categories ", response });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error at /category/categoryitems", error });
  }
});

export default categoryRoute;
