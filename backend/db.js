const mongoose = require('mongoose')  // Import mongoose in db.js
const mongoURI = "mongodb://localhost:27017/inotebook"   // connection String stored in a variable named mongoURI

// ConnectToMongo function helps us to connect to database
const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{    // mongoose.connect method takes two arguements one is the mongoURI which stores our connection string and second is a call back function
        console.log("Connected to Mongo")
    })
}
module.exports = connectToMongo;    // exports connectToMongo function