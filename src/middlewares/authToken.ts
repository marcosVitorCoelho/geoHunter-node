import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.header("Authorization")

    if (!authorizationHeader || !authorizationHeader.startsWith("bearer ")) {
        return res.status(401).json({ success: false, message: "Invalid authorization header" });
    }

    const token = authorizationHeader.replace("Bearer ", "")
    if (!token) {
        return res.status(401).json({ success: false, message: "Authorization token not found" });
    }
    try {
        const decoded = jwt.verify(token, (process.env as any).JWT_SECRET_KEY);
        (req as any).user = decoded;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};