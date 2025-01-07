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
const deleteRouter = express_1.default.Router();
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
deleteRouter.post("/", admin_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title } = req.body;
        try {
            const book = yield prisma.book.findFirst({ where: { title } });
            yield prisma.book.delete({ where: { id: book === null || book === void 0 ? void 0 : book.id } });
            res.status(201).json({ message: "Book deleted sucessfully" });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server error" });
            return;
        }
    });
});
exports.default = deleteRouter;
