import express from "express"
const dotenv = require('dotenv');
import signupRouter from "./routes/auth/signupRoute";
var cors = require('cors')
dotenv.config();
const port = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(cors({credentials: true, origin: '*'}));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/signup", signupRouter);

app.listen(port, () =>{
    console.log(`listening on port ${port}`)
})
