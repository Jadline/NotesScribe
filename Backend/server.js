
const mongoose = require('mongoose')


const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require('./app')

const DB = process.env.MONGO_URI

mongoose.connect(DB).then(() => {
    console.log('successfully connected to the database')
}).catch((err) => {
    console.error('There was an error connecting to the database',err)
})

const port = process.env.PORT || 3000

app.listen(port,() => {
    console.log("App running on port",port)
})