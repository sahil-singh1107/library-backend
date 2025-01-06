import express, { Router } from "express"
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
const prisma = new PrismaClient();
const loginRouter = express.Router();

loginRouter.post("/", function (req, res) {
    const {email, password} = req.body

    try {
        const user = prisma.user.findUnique({where: {email}})
        if (!user ){

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Serve Error"})
        return;
    }
})