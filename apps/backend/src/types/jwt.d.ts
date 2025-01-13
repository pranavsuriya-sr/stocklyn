import { JwtPayload } from "jsonwebtoken";

export interface userType {
  id: string;
  name: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}
