import express from "express"
const dotenv = require('dotenv');
import signupRouter from "./routes/auth/signupRoute";
import loginRouter from "./routes/auth/loginRoute";
import updateRouter from "./routes/books/updateRoute";
import readRouter from "./routes/books/readRoute";
import addRouter from "./routes/books/addRoute";
import deleteRouter from "./routes/books/deleteRoute";
import userbookRouter from "./routes/books/userbookRoute";
import maketransactionRouter from "./routes/transactions/makeTransactionRoute";
import readtransactionRouter from "./routes/transactions/readTransaction";
import updatetransactionRouter from "./routes/transactions/updateTransaction";
import returntransactionRouter from "./routes/transactions/returnTransactionRoute";
import statisticsRouter from "./routes/transactions/libraryStatisticsRoute";
var cors = require('cors')
dotenv.config();
const port = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(cors({credentials: true, origin: '*'}));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/signup", signupRouter);
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/addBook", addRouter);
app.use("/api/v1/updateBook", updateRouter);
app.use("/api/v1/allBooks", readRouter);
app.use("/api/v1/deleteBook", deleteRouter)
app.use("/api/v1/userbooks", userbookRouter)
app.use("/api/v1/maketransaction", maketransactionRouter)
app.use("/api/v1/readtransaction", readtransactionRouter)
app.use("/api/v1/updatetransaction", updatetransactionRouter)
app.use("/api/v1/returntransaction", returntransactionRouter);
app.use("/api/v1/getStats", statisticsRouter)

app.listen(port, () =>{
    console.log(`listening on port ${port}`)
})
