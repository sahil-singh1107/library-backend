"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = __importDefault(require("../../middleware/admin"));
const updatetransactionRouter = express_1.default.Router();
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
updatetransactionRouter.put("/", admin_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, title } = req.body;
        try {
            const user = yield prisma.user.findUnique({ where: { email } });
            const book = yield prisma.book.findFirst({ where: { title } });
            if (!user || !book) {
                res.status(400).json({ message: "User or Book doesn't exist" });
                return;
            }
            const transaction = yield prisma.transaction.findFirst({ where: { userId: user.id, bookId: book.id } });
            if (!transaction) {
                res.status(400).json({ message: "Transaction doesn't exist" });
                return;
            }
            yield prisma.transaction.update({ where: { id: transaction.id }, data: { status: "approved" } });
            yield prisma.book.update({ where: { id: book.id }, data: { availabilityStatus: false, userId: user.id } });
            res.status(200).json({ message: "Transaction and book updated successfully" });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
            return;
        }
    });
});
exports.default = updatetransactionRouter;
