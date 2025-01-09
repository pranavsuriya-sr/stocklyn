import bcrypt from "bcryptjs";
import express from "express";

const authRoute = express.Router();

authRoute.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    res.send(hashedPassword);
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send(error);
    }
  }
});

export default authRoute;
