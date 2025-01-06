"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = require('dotenv');
const signupRoute_1 = __importDefault(require("./routes/auth/signupRoute"));
var cors = require('cors');
dotenv.config();
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors({ credentials: true, origin: '*' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1/signup", signupRoute_1.default);
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
