const jwt = require("jsonwebtoken");
require('dotenv').config();

const authenticationToken = (req,res,next)=>{
const token = req.header("Authorization");
if(!token){
    return res.send({err:"access Denied"})
}
jwt.verify(token, process.env.JWT_SECRET,(err, user)=>{
    if(err){
        return res.send({err:"invalid token"});
    }
    req.user = user;
    next();
})
}

module.exports = authenticationToken;