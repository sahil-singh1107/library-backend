import express from "express"
import checkAdmin from "../../middleware/admin";
const readtransactionRouter = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

readtransactionRouter.get("/", checkAdmin, async function(req, res) {
    try {
        const data = await prisma.transaction.findMany({where: {status : "pending"}, include: {
            user : {
                select: {
                    email: true
                }
            },
            book : {
                select: {
                    title : true
                }
            }
        }});
        res.status(200).json({message : data})
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Serve Error"})
        return;
    }
})

export default readtransactionRouter