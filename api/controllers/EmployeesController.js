/**
 * EmployeesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const _ = require('@sailshq/lodash');

module.exports = {
  
    createEmployee:async (req,res)=>{
        try {
            const managerId = req.managerId;
            const {name,email,password,contact} = req.allParams();
            if(!name) return res.badRequest({err:"Name cannot be empty"});
            if(!validationService.nameValidation(name)) return res.badRequest({err:"invalid name"});
            if(!password) return res.badRequest({err:"password cannot be empty"});
            if(!contact) return res.badRequest({err:"contact cannot be empty"});
            if(!validationService.numericValidation(contact)) return res.badRequest({err:"invalid Phone number"});
            if(!email) return res.badRequest({err:"email cannot be empty"});
            if(!validationService.emailValidation(email)) return res.badRequest({err:"invalid email id"});
            const employeeRecordByContact = await Employees.find({where:{contact:contact}});
            if(!_.isEmpty(employeeRecordByContact)) return res.badRequest({err:"contact number already exists! please use another one"});
            const employeeRecordByEmail = await Employees.find({where:{email:email}});
            if(!_.isEmpty(employeeRecordByEmail)) return res.badRequest({err:"email id already exists!"});
            req.file('imagePath').upload({
                maxBytes:10000000,
                dirname:'../../assets/images/employees',
                saveAs:`employees-${Date.now()}.png`
            },async(error,uploadedFiles)=>{
                if(error) return res.serverError(error.message);
                if(uploadedFiles.length===0) return res.badRequest({err:"No file was uploaded"});
                if(uploadedFiles[0].type==='image/png' || 
                uploadedFiles[0].type ==='image/jpg' || 
                uploadedFiles[0].type ==='image/jpeg'){
                    const fd = uploadedFiles[0].fd;
                    const employee = await Employees.create({
                        name,password:await sails.helpers.bcryptHelper(password),
                        email,imagePath:fd,contact,managerId
                    }).fetch();
                    return res.ok(employee);
                }
                return res.badRequest({err:"only jpeg,jpg and png files are supported!"});
                
                
                
            },
            )
            
        } catch (error) {
           return  res.serverError(error.message);
        }
        
    },
    updateEmployee:async(req,res)=>{
        try {
            const managerId  = req.managerId;
            valuesTobeUpdated = {};
            valuesTobeUpdated['managerId'] = managerId;
            const id = req.params.id;
            if(!id) return res.badRequest({err:"please provide valid id in parameters "});
            const {name,contact} = req.allParams();
            sails.log(name);
            if(name && !validationService.nameValidation(name)) return res.badRequest({err:"invalid name"});
            
            if(name) {
                valuesTobeUpdated["name"] = name;
            }
            if(contact){
                if(!validationService.numericValidation(contact)) return res.badRequest({err:"invalid Phone number"});
                const employeeRecord = await Employees.find({where:{contact:contact}});
                if( _.isEmpty(employeeRecord)||employeeRecord[0].id===id ){
                    valuesTobeUpdated["contact"] = contact;
                }
                else {
                    return res.badRequest({err:"Contact number is already used by some other account"});
                }
            }
            
             req.file('imagePath').upload({
                 maxBytes:10000000,
                dirname:'../../assets/images',
                 saveAs:`employees-${Date.now()}.png`
             },async(error,uploadedFiles)=>{
                if(_.isEmpty(uploadedFiles)){
                    const employeeUpdate = await Employees.update({where:{id:id}},valuesTobeUpdated).fetch();
                    return res.ok(employeeUpdate);
                }
                if(error) return res.serverError(error.message);
                if(uploadedFiles[0].length===0) return res.badRequest({err:"no files was uploaded"});
                if(uploadedFiles[0].type==='image/png' || 
                 uploadedFiles[0].type ==='image/jpg' || 
                 uploadedFiles[0].type ==='image/jpeg'){
                 valuesTobeUpdated["imagePath"] = uploadedFiles[0].fd;
                 
                }
                return res.badRequest({err:"only images with jpeg,jpg and png files are supported"});
           })
        }
            
     catch (error) {
            return res.serverError(error.message);
        }
    },
    deleteEmployee:async(req,res)=>{
        try {
            const id = req.params.id;
            const deletedEmployee = await Employees.destroy({where:{id:id}}).fetch();
            res.ok(deletedEmployee);
        } catch (error) {
            res.serverError(error.message);
        }
    },
    getEmployee:async(req,res)=>{
            const id = req.params.id;
            const employeeRecord = await Employees.find({where:{id:id}});
            if(_.isEmpty(employeeRecord)) return res.badRequest({err:"no employee found with this id"});
            return res.ok(employeeRecord);
        
    }

};

