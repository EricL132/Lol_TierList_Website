const express = require("express")
const app = express()
const dotenv = require("dotenv")
const apiRoute = require("./route/api")
const PORT = process.env.PORT || 9000
const mongoose = require("mongoose")
dotenv.config()



mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => { console.log('MongoDB Connected'); });
mongoose.connection.on('error', (err) => { console.log('MongoDB connection error: ', err); });

app.use("/api",apiRoute)

app.listen(PORT,()=>{
    console.log("Listening to port",PORT)
})