import express from "express"
import checkUser from "../../middleware/auth";
const statisticsRouter = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

statisticsRouter.get("/", async function (req, res) {
    try {
        const pendingBooks = await prisma.transaction.count({
            where: { status : "pending" },
        });
        const approvedBooks = await prisma.transaction.count({
            where: { status: "approved" },
        });
        const returnedBooks = await prisma.transaction.count({
            where: { status: "returned" },
        });
        const chartData = [
            { request: "pending", books: pendingBooks, fill: "var(--color-pending)" },
            { request: "approved", books: approvedBooks, fill: "var(--color-approved)" },
            { request: "returned", books: returnedBooks, fill: "var(--color-returned)" },
        ];
        res.status(200).json(chartData);
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
})

export default statisticsRouter