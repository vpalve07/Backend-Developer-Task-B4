const express = require('express')
const route = require('./routes/route')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://bonus3:bonus3@bonus3.tp3qzt9.mongodb.net/bonusPro3", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDB is connected"))
    .catch(err => console.log(err))

app.use("/", route)

app.listen(3000, function () {
    console.log("Express app running on port 3000")
})