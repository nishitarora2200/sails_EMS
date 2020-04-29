/**
 * Employees.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name:{
      type:'string',
      required:true
    },
    contact:{
      type:'string',
      required:true,
      unique:true
    },
    email:{
      type:'string',
      isEmail:true,
      required:true,
      unique:true
    },
    password:{
      type:'string',
      required:true
    },
    imagePath:{
      type:'string'
    },
    managerId:{
      model:'manager',
      columnName:'manager_id'
    }

  },

};

