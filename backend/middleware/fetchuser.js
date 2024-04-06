const jwt = require('jsonwebtoken');
const JWT_SECRET = "thisisasecrettobeusedforjsonwebtoken";

const fetchuser = (req, res, next)=>{
    // **** fetching the id from authentication token of user which is in header and adding it to the req object
    const authToken = req.header('auth-token')

    if(!authToken){
        return res.status(401).json({"error" : "Authenticate using a valid token"});
    }

    try{
        const data = jwt.verify(authToken, JWT_SECRET);
        req.user = data.user;
        next()

    } catch(err){
        return res.status(401).json({"error" : "Authenticate using a valid token"});
    }
    
}

module.exports = fetchuser;