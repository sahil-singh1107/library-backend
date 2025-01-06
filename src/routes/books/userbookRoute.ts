import express from "express"
import checkUser from "../../middleware/auth";
const userbookRouter = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

userbookRouter.get("/", checkUser, async function(req, res) {
    const {email} = req.body;
    try {
        const user = await prisma.user.findUnique({where: {email}});
        const books = await prisma.book.findMany({where: {userId : user?.id}});
        res.status(200).json({message : books});
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"})
        return;
    }
})

export default userbookRouter