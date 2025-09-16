const express = require('express')
const cors = require("cors")
const userRoutes = require("./routes/userRoutes")
const {connectMongoDB} = require("./connnection")
const app = express()
const port = 8000
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.urlencoded({ extended: true }))

connectMongoDB("mongodb://127.0.0.1:27017/PARKr").then(()=>{
    console.log(`MongoDB Connected`)
})

app.use("/user",userRoutes)

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})