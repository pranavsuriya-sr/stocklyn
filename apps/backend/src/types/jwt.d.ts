import { JwtPayload } from "jsonwebtoken";

export interface userType {
  name: string;
  email: string;
  //   role: "seller" | "buyer" | "admin";
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}
