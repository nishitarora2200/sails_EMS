const _ = require('@sailshq/lodash');
const bcrypt = require('bcrypt');
const accountSid = 'AC9e4a1a47d1bec5895c6e5be68d1e18f0';
const authToken = 'd385e3dc737c7c7b05db64df954118c9';
const twilio = require('twilio')(accountSid,authToken);
module.exports = {
    createManager:async(req,res)=>{
        try {
            const file = req.file;
            sails.log(file);
            const {name,email,password,contact} = req.allParams();
            if(!name) return res.status(404).json({statusCode:404,err:"Name cannot be empty"});
            if(!validationService.nameValidation(name)) return res.status(404).json({statusCode:400,err:"invalid name"});
            if(!password) return res.status(404).json({statusCode:404,err:"password cannot be empty"});
            if(!contact) return res.status(404).json({statusCode:400,err:"contact cannot be empty"});
            if(!validationService.numericValidation(contact)) return res.status(404).json({statusCode:400,err:"invalid Phone number"});
            if(!email) return res.status(404).json({statusCode:404,err:"email cannot be empty"});
            if(!validationService.emailValidation(email)) return res.status(404).json({statusCode:400,err:"invalid email id"});

            const managerRecord = await Manager.find({where:{contact:contact}});
                if(!_.isEmpty(managerRecord)) return res.status(404).json({statusCode:400,err:"contact number already exists! please use another one"});
                const manager = await Manager.create({
                    name,password:await sails.helpers.bcryptHelper(password),
                    email,contact
                }).intercept('E_UNIQUE',(err)=>{
                    return res.status(403).json({statusCode:403,err:"email is already in use"});
                }).fetch();
                return res.ok(manager);
        } catch (error) {
            return res.serverError(error.message);
        }
        
    },
    managerLogin:async(req,res)=>{
        try {
            sails.log(sails.config.path);
        const {email,password} = req.allParams();
        if(!email) return res.status(404).json({statusCode:404,err:"email cannot be empty"});
        if(!validationService.emailValidation(email)) return res.status(400).json({statusCode:400,err:"invalid email id"});
        if(!password) return res.status(404).json({statusCode:404,err:"password cannot be empty"});
        const managerRecord = await Manager.find({where:{email:email}});
        if(_.isEmpty(managerRecord)) return res.status(403).json({statusCode:403,err:"you are not registered! please signup "});
        const comparedPassword = await bcrypt.compare(password,managerRecord[0].password,);
        if(!comparedPassword) return res.status(400).json({statusCode:400,err:"Incorrect password! please try again"});
        const payload = {
            managerId:managerRecord[0].id
        }
        sails.log(payload);
        
        const Token = await jwtTokenService.signToken(payload);
        return res.status(200).json({
            statusCode:200,
            Token:Token
        })
        } catch (error) {
           return res.status(500).json({
               statusCode:500,
               error:error.messsage
           })
}
    }
}