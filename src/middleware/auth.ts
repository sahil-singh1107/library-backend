import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const secret = process.env.JWT_SECRET!;
const prisma = new PrismaClient();

declare global {
    namespace Express {
        interface Request {
            userId?: number;
        }
    }
}

export default async function checkUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { token } = req.body;
    if (!token) {
        res.status(401).json({ message: "Authentication token is required" });
        return;
    }
    try {
            const decoded = jwt.verify(token, secret) as JwtPayload;
        if (!decoded.email) {
            res.status(401).json({ message: "Invalid token" });
            return;
        }

        const user = await prisma.user.findUnique({ where: { email: decoded.email } })

        if (!user) {
            res.status(401).json({ message: "User not found or not logged in" });
            return;
        }
        req.body.userId = user.id;
        next();
        return;
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
}
