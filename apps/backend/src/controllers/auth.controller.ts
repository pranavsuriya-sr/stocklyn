import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static async signup(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const user = await AuthService.signup(name, email, password);
      res
        .status(201)
        .json({ message: "Signup successful, please login", user });
    } catch (error) {
      throw error;
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const { userData, token } = await AuthService.login(email, password);

      res.cookie("authToken", token, { httpOnly: true });
      res.status(200).json({
        message: "Login successful!",
        userData,
      });
    } catch (error) {
      throw error;
    }
  }
}
