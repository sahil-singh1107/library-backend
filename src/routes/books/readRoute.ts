import express from "express"
const readRouter = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


readRouter.get("/", async function(req, res) {
    try {
        const books = await prisma.book.findMany({where: {availabilityStatus: true}});
        res.status(200).json({message : books});
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"})
        return;
    }
})

export default readRouter