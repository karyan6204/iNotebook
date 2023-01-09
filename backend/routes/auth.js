const express = require('express'); // Importing express
const router = express.Router();    // Importing router from express
const User = require('../models/User');
const { body, validationResult } = require('express-validator'); //Importing express-validator to check the validations whether the informations entered are valid or not for registration
const bcrypt = require('bcryptjs'); //Importing bcryptjs to salt and hash our password
const jwt = require('jsonwebtoken'); //Importing jsonwebtoken to create our authentication token for our login user
const fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = 'Aryanisagoodboy'; //Storing jwt secret for signing the authtoken

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No Login required
router.post('/createuser',[
    body('name','Enter valid name').isLength({ min: 3 }),
    body('email','Enter valid email').isEmail(),
    body('password','Password length is too small').isLength({ min: 5 }),
],async (req,res)=>{
    let success = false;
  //If there are errors, return Bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      //Check whether user with this email exists already, if not then send the bad request
      let user = await User.findOne({email:req.body.email});
      if(user){
        return res.status(400).json({success,error:'User with this email already exists'})
      }
      const salt = await bcrypt.genSalt(10); //Creating salt to hash the password with it
      const securePass = await bcrypt.hash(req.body.password,salt); //Hashing our password with the salt
      // Creating a new User
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePass,
      })
      // Creating our data(ID) which will be used by jwt with the jwt_secret to genrate authtoken for the user
      const data = {
        user:{
          id : user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET); // creating our authtoken by signing with jwt secret
      success = true;
      res.json({success,authtoken});//Sending authtoken as a response on registering
    }catch (error) {
      console.error(error.message);
      res.status(500).send('Internal server error');
    }
})


// ROUTE 2: Authenticate a User with credentials using: POST "/api/auth/login". No Login required
router.post('/login',[
  body('email','Enter your valid email').isEmail(),
  body('password','Enter your valid password').exists(),
],async (req,res)=>{
  let success = false;
  // If there are errors, return Bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    // Store email and password from body
    const {email,password} = req.body;
    try {
      // Finding the Email in the database
      let user = await User.findOne({email:req.body.email});
      // If email is not found in the database them send bad request and an error
      if(!user){
        return res.status(400).json({ success, errors: 'Enter with correct credentials'});
      }
      // Comparing password with the password stored in database using bcrypt.compare
      const passwordCompare = await bcrypt.compare(password,user.password);
      // If password doesn't match from the password stored in the database then send bad request and an error
      if(!passwordCompare){
        success = false;
        return res.status(400).json({ success, errors: 'Enter with correct credentials'});
      }
      // Storing user ID in the data to sign it with the jwt secret for authtoken
      const data = {
        user:{
          id : user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET); // creating our authtoken by signing with jwt secret
      success = true;
      res.json({success,authtoken});//Sending authtoken as a response on login
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internel server error');
    }
})
  

// ROUTE 3: Get loggedin user detailes using: POST "/api/auth/getuser". Login required
  // We would be creating a new route to get the details of the logged-in User using Post requests. Remember, that to use this route, a login is required. This simply means that we need to send the JWT token to this route.
router.post('/getuser',fetchuser, async (req,res) => {
  try {
    const userId = req.user.id;   // Getting the user-id
    const user = await User.findById(userId).select("-password");   // Finding the User details by ID without password
    // Sending the user, as a response
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internel server error');
  }
});

module.exports = router;