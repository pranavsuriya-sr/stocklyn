import express from "express";
import { AuthController } from "../../controllers/auth.controller";
import { errorHandler } from "../../middlewares/error-handlers";
import { validateRequest } from "../../middlewares/validateRequest";
import { loginSchema, signupSchema } from "../../validators/auth.validator";

const authRoute = express.Router();

authRoute.post("/signup", validateRequest(signupSchema), AuthController.signup);

authRoute.post("/login", validateRequest(loginSchema), AuthController.login);

authRoute.use(errorHandler);

export default authRoute;
