import express from "express"
import checkAdmin from "../../middleware/admin";
const addRouter = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

addRouter.post("/", checkAdmin, async function (req, res) {
    const {title, author, publicationYear} = req.body

    try {
        await prisma.book.create({data: {
            title,
            author,
            publicationYear
        }})

        res.status(201).json({message : "Book added successfully"});
        return;

    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Server Error"})
        return;
    }
})

export default addRouter