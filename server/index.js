const express = require('express')
const {connectMongoDB} = require("./connnection")
const app = express()
const port = 8000

connectMongoDB("mongodb://127.0.0.1:27017/PARKr").then(()=>{
    console.log(`MongoDB Connected`)
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})