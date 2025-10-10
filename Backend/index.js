require("dotenv").config();
const express = require("express");
const router = require("./routes/router");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
const connectdb = require("./config/db");
const { auth : authMiddleware} = require("./middlewares/auth");



connectdb();

app.use(cors());
app.use(express.json());
app.use("/api",router);


app.use("/healthcheck",(req,res)=>{
    res.send("hello");
})

app.use("/",authMiddleware,(req,res)=>{
    res.send("working fine");
})


app.listen(PORT,()=>{
    console.log("Server is up at port",`${PORT}`);
})