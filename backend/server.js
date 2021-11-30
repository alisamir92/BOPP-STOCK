const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app.js')

dotenv.config({path: "./config.env"})

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATA_PASSWORD)


mongoose
.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    
    console.log("Connection is successful.......")
})

const port = process.env.PORT || 5000;

app.listen(port,() => {
    console.log(`Listening for the ${port}...`)
})
