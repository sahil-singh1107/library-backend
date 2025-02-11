import express from "express"
import checkUser from "../../middleware/auth";
const maketransactionRouter = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

maketransactionRouter.post("/", checkUser, async function (req, res) {
    const { userId, title } = req.body
    try {
        const user = await prisma.user.findUnique({ where: { id :  userId} })
        const book = await prisma.book.findFirst({ where: { title } })

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        if (!book) {
            res.status(404).json({ message: "Book not found" });
            return;
        }
        await prisma.transaction.create({
            data: {
                bookId: book.id,
                userId: user.id,
                borrowDate: new Date().toISOString(),
                returnDate: "NULL",
                status : "pending"
            }
        })
        res.status(201).json({message : "Transaction created successfully"});
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
        return;
    }
})

export default maketransactionRouter