require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const connectdb = require("./config/db");


connectdb();


app.use("/",(req,res)=>{
    res.send("working fine!");
})

app.listen(PORT,()=>{
    console.log("Server is up at port",`${PORT}`);
})