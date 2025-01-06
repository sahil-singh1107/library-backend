import express from "express"
import checkUser from "../../middleware/auth";
const returntransactionRouter = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

returntransactionRouter.put("/", checkUser, async function(req, res) {
    const {email, title} = req.body
    try {
        const user = await prisma.user.findUnique({where: {email}})
        const book = await prisma.book.findFirst({where: {title}})
        if (!user || !book) {
            res.status(400).json({message : "User or Book doesn't exist"})
            return;
        }
        const transaction = await prisma.transaction.findFirst({where: {userId: user.id, bookId : book.id}});
        if (!transaction) {
            res.status(400).json({ message: "Transaction doesn't exist" });
            return;
        }
        await prisma.transaction.update({where: {id : transaction.id}, data: {status: "returned", returnDate: new Date().toISOString()}});
        await prisma.book.update({where: {id : book.id}, data: {availabilityStatus : true, userId : null}});
        res.status(200).json({ message: "Transaction and book updated successfully" });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Server Error"});
        return;
    }
})

export default returntransactionRouter