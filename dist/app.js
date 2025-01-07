"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const signupRoute_1 = __importDefault(require("./routes/auth/signupRoute"));
const loginRoute_1 = __importDefault(require("./routes/auth/loginRoute"));
const updateRoute_1 = __importDefault(require("./routes/books/updateRoute"));
const readRoute_1 = __importDefault(require("./routes/books/readRoute"));
const addRoute_1 = __importDefault(require("./routes/books/addRoute"));
const deleteRoute_1 = __importDefault(require("./routes/books/deleteRoute"));
const userbookRoute_1 = __importDefault(require("./routes/books/userbookRoute"));
const makeTransactionRoute_1 = __importDefault(require("./routes/transactions/makeTransactionRoute"));
const readTransaction_1 = __importDefault(require("./routes/transactions/readTransaction"));
const updateTransaction_1 = __importDefault(require("./routes/transactions/updateTransaction"));
const returnTransactionRoute_1 = __importDefault(require("./routes/transactions/returnTransactionRoute"));
const libraryStatisticsRoute_1 = __importDefault(require("./routes/transactions/libraryStatisticsRoute"));
var cors = require('cors');
dotenv.config();
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors({ credentials: true, origin: '*' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1/signup", signupRoute_1.default);
app.use("/api/v1/login", loginRoute_1.default);
app.use("/api/v1/addBook", addRoute_1.default);
app.use("/api/v1/updateBook", updateRoute_1.default);
app.use("/api/v1/allBooks", readRoute_1.default);
app.use("/api/v1/deleteBook", deleteRoute_1.default);
app.use("/api/v1/userbooks", userbookRoute_1.default);
app.use("/api/v1/maketransaction", makeTransactionRoute_1.default);
app.use("/api/v1/readtransaction", readTransaction_1.default);
app.use("/api/v1/updatetransaction", updateTransaction_1.default);
app.use("/api/v1/returntransaction", returnTransactionRoute_1.default);
app.use("/api/v1/getStats", libraryStatisticsRoute_1.default);
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
