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
            const {name,email,password,imagePath,contact} = req.allParams();
            if(!name) return res.badRequest({err:"Name cannot be empty"});
            if(!validationService.nameValidation(name)) return res.badRequest({err:"invalid name"});
            if(!password) return res.badRequest({err:"password cannot be empty"});
            if(!imagePath) return res.badRequest({err:"imagePath cannot be empty"});
            if(!contact) return res.badRequest({err:"contact cannot be empty"});
            if(!validationService.numericValidation(contact)) return res.badRequest({err:"invalid Phone number"});
            if(!email) return res.badRequest({err:"email cannot be empty"});
            if(!validationService.emailValidation(email)) return res.badRequest({err:"invalid email id"});
            const employeeRecord = await Employees.find({where:{contact:contact}});
            if(!_.isEmpty(employeeRecord)) return res.badRequest({err:"contact number already exists! please use another one"});
            const employee = await Employees.create({
                name,password:await sails.helpers.bcryptHelper(password),
                email,imagePath,contact,managerId
            }).intercept('E_UNIQUE',(err)=>{
                return res.badRequest({err:"email is already in use"});
            }).fetch();
            
            return res.ok(employee);
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
            const {name,imagePath,contact} = req.allParams();
            if(name && !validationService.nameValidation(name)) return res.badRequest({err:"invalid name"});
            if(!contact) return res.badRequest({err:"contact cannot be empty"});
            if(!validationService.numericValidation(contact)) return res.badRequest({err:"invalid Phone number"});
            if(name) {
                valuesTobeUpdated["name"] = name;
            }
            
            const employeeRecord = await Employees.find({where:{contact:contact}});
            if( _.isEmpty(employeeRecord)||employeeRecord[0].id==id ){
                valuesTobeUpdated["contact"] = contact;
            }
            else{
                return res.badRequest({err:"Contact number is already used by some other account"});
            }
            if(imagePath){
                valuesTobeUpdated["imagePath"] = imagePath;
            }

            const employeeUpdate = await Employees.update({where:{id:id}},valuesTobeUpdated).fetch();
            return res.ok(employeeUpdate);
            

        } catch (error) {
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

