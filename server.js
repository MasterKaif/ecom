const express = require('express')
const app = express()
const serverConfig = require('./configs/server.config')
const dbConnection = require("./DAO/repository/dbConnection")
const bodyparser = require('body-parser')
const { createRoutes } = require("./routes/parentRouter")
const { initializeTables } = require("./DAO/repository/tableInitializers")
app.use(bodyparser.urlencoded({ extended: true}))
app.use(bodyparser.json())

app.get("/", (req, res)=>{
    res.send({message: "Welcome to Ecommerce Application"})
})


app.listen(serverConfig.PORT, serverConfig.HOST, ()=>{
    console.log(`server is listining on ${serverConfig.HOST}: ${serverConfig.PORT}`)
});

// IIFE - Immiedietly invoked function expression!
(() => {
    //1.
    createRoutes(app)
    if(serverConfig.ENV === 'dev'){
        initializeTables(false)
    }
})()