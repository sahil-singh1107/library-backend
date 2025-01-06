import express from "express"
import checkUser from "../../middleware/auth";
const transactionRouter = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

transactionRouter.post("/", checkUser, async function (req, res) {
    const { email, title } = req.body

    try {
        const user = await prisma.user.findUnique({ where: { email } })
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
                returnDate: "NULL"
            }
        })
        res.status(201).json({message : "Transaction created successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
        return;
    }
})