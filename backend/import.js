const dotenv = require('dotenv')
const mongoose = require('mongoose')
const fs = require('fs')
const Roll = require('./models/rollModel')
dotenv.config({path: "./config.env"})

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATA_PASSWORD)



mongoose
// .connect(process.env.DATABASE_LOCAL, {
.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    
    console.log("Connection is successful.......")
})

const rolls = JSON.parse(fs.readFileSync("./db.json"))


const addAllTours = async () => {
    try {
        await Roll.create(rolls);
        console.log("data has added")
    }catch (err){
        console.log(err);
    }
    process.exit()
    
}

const deleteAllTours = async () => {
    try {
        await Roll.deleteMany();
        console.log("data has deleted")
    }catch (err){
        console.log(err);
    }
    process.exit()
    
}

addAllTours()







