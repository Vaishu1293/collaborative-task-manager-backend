import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function authMiddleware(
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
    };

    (req as any).user = { id: decoded.id };

    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}
export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

