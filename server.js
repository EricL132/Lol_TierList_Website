const express = require("express")
const app = express()
const dotenv = require("dotenv")
const apiRoute = require("./route/api")
const PORT = process.env.PORT || 7003
const mongoose = require("mongoose")
const path = require('path');

dotenv.config()

app.use(express.static(path.join(__dirname,'/front/build')))
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/react/build/index.html'))
})
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => { console.log('MongoDB Connected'); });
mongoose.connection.on('error', (err) => { console.log('MongoDB connection error: ', err); });

app.use("/api",apiRoute)
app.get('*', (request, res) => {
    res.sendFile(path.join(__dirname + '/react/build/index.html'));
  });
app.listen(PORT,()=>{
    console.log("Listening to port",PORT)
})