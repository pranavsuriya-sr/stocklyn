import { JwtPayload } from "jsonwebtoken";

export interface userType {
  id: string;
  name: string;
  email: string;
  //   role: "seller" | "buyer" | "admin";
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}
