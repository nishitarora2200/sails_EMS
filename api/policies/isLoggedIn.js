const _ = require('@sailshq/lodash');
module.exports = async (req,res,next)=>{

    try {
        
        if(req.headers && req.headers.authorization===undefined){
            return res.status(403).json({statusCode:403,err:"this is protected route! please Login first"});
        }
        const Token = req.headers.authorization;
        const manager = await jwtTokenService.verifyToken(Token);
        const managerRecord = await Manager.find({where:{id:manager.id}});
        if(_.isEmpty(managerRecord)) return res.status(403).json({statusCode:403,err:"you are not allowed to access! "});
        req.managerId = managerRecord[0].id;
       
        next();
    } catch (error) {
        res.status(400).json({
            statusCode:400,
            error:error.message
        });
    }
        
    
}