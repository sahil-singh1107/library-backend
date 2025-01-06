import express from "express"
import checkAdmin from "../../middleware/admin";
const updatetransactionRouter = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

updatetransactionRouter.put("/", checkAdmin, async function(req, res) {
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
        await prisma.transaction.update({where: {id : transaction.id}, data: {status: "approved"}});
        await prisma.book.update({where: {id : book.id}, data: {availabilityStatus : false, userId : user.id}});
        res.status(200).json({ message: "Transaction and book updated successfully" });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Server Error"});
        return;
    }
})

export default updatetransactionRouter