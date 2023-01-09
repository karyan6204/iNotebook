const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Aryanisagoodboy';

const fetchuser = (req, res, next) => {
    // Get the user from jwt token and add it to req object
    const token = req.header('auth-token'); // Get the token from header
    if(!token){
        res.status(401).send({error:'Please authenticate using valid token'});
    }
    try {
        // Verifying the token and the JWT SECRET
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        // If verified then execute next()
        next();
    } catch (error) {
        res.status(401).send({error:'Internal server error of try catch'});
    }
    
}

module.exports = fetchuser;