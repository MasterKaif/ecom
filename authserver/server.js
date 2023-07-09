const express = require("express");
const { createUserTokenTable } = require("./dao/repository/UserToken.repository");
const authRouter = require("./routes/authRouter")
const bodyparser = require('body-parser')
const app = express()
app.use(bodyparser.urlencoded({ extended: true}))
app.use(bodyparser.json())



app.use("/auth",  authRouter);

(() => {
    createUserTokenTable();
})()

app.listen("4000", err => {
     if(err){
        console.log("error in starting server")
     }
})