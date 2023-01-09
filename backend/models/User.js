const mongoose = require('mongoose'); //Importing mongoose
const { Schema } = mongoose;  //Using Schema from mongoose

// Creating a Schema for the Users 
const UserSchema = new Schema({
  name:{
    type : String,
    required : true
  },
  email:{
    type : String,
    required : true,
    unique : true
  },
  password:{
    type: String,
    required : true
  },
  date:{
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('user',UserSchema);; 