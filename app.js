const connectToMongo = require('./db');
const express = require('express');
connectToMongo()
const port = 80;
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(cors())
// Available routes

app.use('/api/auth', require('./routes/auth'))
app.use('/api/quiz', require('./routes/quiz'))
app.listen(port, "api.api" ,()=>{
    console.log("CrackExam backend listening at http://api.api")
})
app.listen(port, "127.0.0.1" ,()=>{
    console.log("CrackExam backend listening at http://127.0.0.1")
})