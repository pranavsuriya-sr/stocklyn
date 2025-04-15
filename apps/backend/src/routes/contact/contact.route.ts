import express, { Request, Response } from "express";
import { prisma } from "../../server";

const contactRoute = express.Router();

contactRoute.post("/add", async (req: Request, res: Response) => {
  const { name, email, phone, message, userId } = req.body;
  //   console.log(req.body);
  //   return;

  if (!name || !email || !phone || !message || !userId) {
    res.status(400).json({
      message: "All fields are required",
    });
    return;
  }

  try {
    const response = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        info: message,
        userId,
      },
    });

    res.status(200).json({ message: "Contact added successfully", response });
  } catch (error) {
    res.status(500).json({ message: "Error at /contact/addContact", error });
  }
});

export default contactRoute;
