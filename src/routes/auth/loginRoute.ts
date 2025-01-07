import express, { Router } from "express"
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
const prisma = new PrismaClient();
const loginRouter = express.Router();
const secret = process.env.JWT_SECRET!


loginRouter.post("/", async function (req, res) {
    const { email, password } = req.body

    try {
        const user = await prisma.user.findUnique({ where: { email }, select: { email: true, password: true } })
        if (!user) {
            res.status(404).json({ message: "Either user doesn't exist or password is wrong" })
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            res.status(404).json({ message: "Either user doesn't exist or password is wrong" })
            return;
        }

        const token = jwt.sign({ email }, secret, {expiresIn: "2h"});

        res.status(200).json({ token, message: "Login Successful", email : user.email });

        return;

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Serve Error" })
        return;
    }
});

export default loginRouter