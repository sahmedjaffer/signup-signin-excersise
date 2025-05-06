const mongoose = require('mongoose')
require('dotenv').config()

const connect = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Successful connection")
        
    } catch (error) {

        console.error("Connection failed",error.message)
        
    }

}

connect()

module.exports = mongoose.conenction