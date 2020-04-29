const _ = require('@sailshq/lodash');
module.exports = async (req,res,next)=>{

    try {
        
        if(req.headers && req.headers.authorization===undefined){
            return res.badRequest({err:"this is protected route! please Login first"});
        }
        const Token = req.headers.authorization;
        const manager = await jwtTokenService.verifyToken(Token);
        const managerRecord = await Manager.find({where:{id:manager.id}});
        if(_.isEmpty(managerRecord)) return res.badRequest({err:"you are not allowed to access! "});
        req.managerId = managerRecord[0].id;
       
        next();
    } catch (error) {
        res.end(error.message);
    }
        
    
}