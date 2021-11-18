require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})