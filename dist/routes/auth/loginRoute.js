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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const loginRouter = express_1.default.Router();
const secret = process.env.JWT_SECRET;
loginRouter.post("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const user = yield prisma.user.findUnique({ where: { email }, select: { email: true, password: true } });
            if (!user) {
                res.status(404).json({ message: "Either user doesn't exist or password is wrong" });
                return;
            }
            const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordMatch) {
                res.status(404).json({ message: "Either user doesn't exist or password is wrong" });
                return;
            }
            const token = jsonwebtoken_1.default.sign({ email }, secret, { expiresIn: "2h" });
            res.status(200).json({ token, message: "Login Successful", email: user.email });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Serve Error" });
            return;
        }
    });
});
exports.default = loginRouter;
