import express from "express"
import checkAdmin from "../../middleware/admin";
const deleteRouter = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

deleteRouter.post("/", checkAdmin, async function(req, res) {
    const {title} = req.body
    try {
        const book = await prisma.book.findFirst({where: {title}})
        await prisma.book.delete({where: {id : book?.id}});
        res.status(201).json({message : "Book deleted sucessfully"});
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Server error"});
        return;
    }
})

export default deleteRouter