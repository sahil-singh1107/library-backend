import express, { Router } from "express"
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
const prisma = new PrismaClient();
const signupRouter = express.Router();

// req.body - email, password, firstname, lastname, phone_number, 

signupRouter.post("/", async function (req, res) {

    const { email, password, firstName, lastName, phone_number } = req.body

    try {

        const findUser = await prisma.user.findUnique({where: {email}})

        if (findUser) {
            res.status(409).json({message : "Email already in use"})
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                phone_number
            }
        })

        res.status(201).json({ message: "User Created Successfully" })
        return;

    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Serve Error"});
        return;
    }
}
)

export default signupRouter