import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { envConfig } from "@/config";

export const jwtMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, envConfig.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({
          code: 401,
          message: "UNAUTHORIZED",
        });
      } else {
        (req as any).decoded = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({
      code: 401,
      message: "UNAUTHORIZED",
    });
  }
};
