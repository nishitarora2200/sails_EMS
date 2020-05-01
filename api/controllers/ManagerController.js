const _ = require('@sailshq/lodash');
const bcrypt = require('bcrypt');
module.exports = {
    createManager:async(req,res)=>{
        try {
            const file = req.file;
            sails.log(file);
            const {name,email,password,contact} = req.allParams();
            if(!name) return res.badRequest({err:"Name cannot be empty"});
            if(!validationService.nameValidation(name)) return res.badRequest({err:"invalid name"});
            if(!password) return res.badRequest({err:"password cannot be empty"});
            if(!contact) return res.badRequest({err:"contact cannot be empty"});
            if(!validationService.numericValidation(contact)) return res.badRequest({err:"invalid Phone number"});
            if(!email) return res.badRequest({err:"email cannot be empty"});
            if(!validationService.emailValidation(email)) return res.badRequest({err:"invalid email id"});

            const managerRecord = await Manager.find({where:{contact:contact}});
                if(!_.isEmpty(managerRecord)) return res.badRequest({err:"contact number already exists! please use another one"});
                const manager = await Manager.create({
                    name,password:await sails.helpers.bcryptHelper(password),
                    email,contact
                }).intercept('E_UNIQUE',(err)=>{
                    return res.badRequest({err:"email is already in use"});
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
        if(!email) return res.badRequest({err:"email cannot be empty"});
        if(!validationService.emailValidation(email)) return res.badRequest({err:"invalid email id"});
        if(!password) return res.badRequest({err:"password cannot be empty"});
        const managerRecord = await Manager.find({where:{email:email}});
        if(_.isEmpty(managerRecord)) return res.badRequest({err:"you are not registered! please signup "});
        const comparedPassword = await bcrypt.compare(password,managerRecord[0].password,);
        if(!comparedPassword) return res.badRequest({err:"Incorrect password! please try again"});
        const payload = {
            managerId:managerRecord[0].id
        }
        sails.log(payload);
        
        const Token = await jwtTokenService.signToken(payload);
        return res.ok(Token);
        } catch (error) {
           return res.serverError(error.message); 
        }
        


    }

}