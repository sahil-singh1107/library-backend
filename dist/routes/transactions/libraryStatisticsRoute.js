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
const statisticsRouter = express_1.default.Router();
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
statisticsRouter.get("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pendingBooks = yield prisma.transaction.count({
                where: { status: "pending" },
            });
            const approvedBooks = yield prisma.transaction.count({
                where: { status: "approved" },
            });
            const returnedBooks = yield prisma.transaction.count({
                where: { status: "returned" },
            });
            const chartData = [
                { request: "pending", books: pendingBooks, fill: "var(--color-pending)" },
                { request: "approved", books: approvedBooks, fill: "var(--color-approved)" },
                { request: "returned", books: returnedBooks, fill: "var(--color-returned)" },
            ];
            res.status(200).json(chartData);
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    });
});
exports.default = statisticsRouter;
