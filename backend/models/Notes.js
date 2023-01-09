const mongoose = require('mongoose'); //Importing mongoose
const { Schema } = mongoose; //Using Schema from mongoose

// Creating a Schema for the Notes 
const NotesSchema = new Schema({
  user:{
    // This specifies that this particular note is for a particular user so that anyone else cannot access it.
    // It is just like a foreign key in MySQL
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user' // Giving it a reference of the user model
  },
  title:{
    type : String,
    required : true
  },
  description:{
    type : String,
    required : true
  },
  tags:{
    type: String,
    default : "General"
  },
  date:{
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('notes',NotesSchema);