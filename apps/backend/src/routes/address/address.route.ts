import express, { Request, Response } from "express";
import { prisma } from "../../server";

const addressRoute = express.Router();

addressRoute.post("/addAddress", async (req: Request, res: Response) => {
  const {
    name,
    mobileNumber,
    state,
    pincode,
    city,
    address1,
    address2,
    landmark,
    userId,
  } = req.body;

  if (
    !name ||
    !mobileNumber ||
    !state ||
    !pincode ||
    !city ||
    !address1 ||
    !landmark ||
    !userId
  ) {
    console.log("Error at /address/addAddress , missing feilds");
    res.status(500).send("Something went wrong!");
    return;
  }

  try {
    const isValidUser = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!isValidUser) {
      console.log("Error at /address/addAddress , invalid userId");
      res.status(500).send("Something went wrong!");
    }

    const response = await prisma.address.create({
      data: {
        name,
        mobileNumber,
        state,
        pincode,
        city,
        address1,
        address2,
        landmark,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    res.status(201).json({ message: "Added the location", response });
  } catch (error) {
    console.log("Error at /address/addAddress", error);
    res.status(500).send("Something went wrong!");
  }
});

addressRoute.get("/getAddress/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const response = await prisma.address.findMany({
      where: {
        userId: userId,
      },
    });
    res.status(200).json({ message: "Fetched all the locations ", response });
  } catch (error) {
    console.log("Error at /address/addAddress", error);
    res.status(500).send("Something went wrong!");
  }
});

addressRoute.delete("/delete/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    console.log("Error at /deleteAddress , missing feilds");
    res.status(500).send("Something went wrong!");
    return;
  }

  try {
    await prisma.address.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    res.status(500).send(error);
    console.log("Error at the /address/deleteAddress", error);
  }
});

export default addressRoute;
