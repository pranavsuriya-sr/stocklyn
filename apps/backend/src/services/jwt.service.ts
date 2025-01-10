import jwt from "jsonwebtoken";

export interface userType {
  name: string;
  email: string;
}

export const GenerateJwtToken = (data: userType) => {
  try {
    const payload = { email: data.email, name: data.name };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    return token;
  } catch (error) {
    console.error("Error generating JWT:", error);
    throw new Error("Failed to generate token.");
  }
};
