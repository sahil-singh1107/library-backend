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
exports.default = checkUser;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const secret = process.env.JWT_SECRET;
const prisma = new client_1.PrismaClient();
function checkUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { token } = req.body;
        if (!token) {
            res.status(401).json({ message: "Authentication token is required" });
            return;
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            if (!decoded.email) {
                res.status(401).json({ message: "Invalid token" });
                return;
            }
            const user = yield prisma.user.findUnique({ where: { email: decoded.email } });
            if (!user) {
                res.status(401).json({ message: "User not found or not logged in" });
                return;
            }
            req.email = user.email;
            next();
        }
        catch (error) {
            console.log(error);
            res.status(401).json({ message: "Invalid or expired token" });
        }
    });
}
