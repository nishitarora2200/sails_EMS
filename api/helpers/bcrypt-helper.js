let bcrypt = require('bcrypt');
module.exports = {
    friendlyName:"encrypt user login password",
    description:"return a encrypted password",
    inputs:{
        password:{
            type:'string',
            example:'password1234',
            description:'password of employee',
            required:true
        },
        usage:{
            type:'string',
            example:'encrypt',
            description:'encrypt or decrypt as a options'
        }
    },
    fn: async function(inputs,exits){
    async function encryptPassword(){
        let hashedPassword = await bcrypt.hash(inputs.password,12);
        return hashedPassword;  
    }
    return exits.success(await encryptPassword(inputs.password));
        
    
    }
}