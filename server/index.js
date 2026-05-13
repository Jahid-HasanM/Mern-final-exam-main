const express = require('express')
const cors = require('cors')
require('dotenv').config()
const dbConfig = require('./db')
const authRouter = require('./router/authRouter');

const app = express()

app.use(cors())
app.use(express.json())
dbConfig();

app.use('/auth', authRouter);

app.listen(8000, ()=>{
    console.log('Server is running on port 8000')
})