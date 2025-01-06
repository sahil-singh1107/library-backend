import express from "express"
import checkAdmin from "../../middleware/admin";
const updateRouter = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

updateRouter.put("/", checkAdmin, async function(req, res) {
    const {title, newTitle, newAuthor, newpublicationYear} = req.body
    try {
        const book = await prisma.book.findFirst({where: {title}})
        if (newTitle) await prisma.book.update({where: {id : book?.id}, data: {title : newTitle}});
        if (newAuthor) await prisma.book.update({where: {id : book?.id}, data: {author: newAuthor}});
        if (newpublicationYear) await prisma.book.update({where: {id : book?.id}, data: {publicationYear: newpublicationYear}});
        res.status(201).json({message : "Book updated sucessfully"});
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Server error"});
        return;
    }
})

export default updateRouter