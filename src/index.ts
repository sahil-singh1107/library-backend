import express from "express"
const dotenv = require('dotenv');
import signupRouter from "./routes/auth/signupRoute";
import loginRouter from "./routes/auth/loginRoute";
import updateRouter from "./routes/books/updateRoute";
import readRouter from "./routes/books/readRoute";
import addRouter from "./routes/books/addRoute";
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

app.listen(port, () =>{
    console.log(`listening on port ${port}`)
})
