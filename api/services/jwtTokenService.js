const jwt = require('jsonwebtoken');
const SECRET = "myTokenSecret";
module.exports={
    signToken:async(payload)=>{
    const Token = jwt.sign(payload,SECRET,{expiresIn:10*60*10});
    return Token; 
    },
    verifyToken:async(token)=>{
        const decodeToken = jwt.verify(token,SECRET);
        if(!decodeToken) return new Error("invalid token");
        return decodeToken;
    }
        
    
}