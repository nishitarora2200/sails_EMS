# employees-management-project

a [Sails v1](https://sailsjs.com) application


### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Wed Apr 29 2020 11:07:12 GMT+0530 (India Standard Time) using Sails v1.0.0.

<!-- Internally, Sails used [`sails-generate@1.16.13`](https://github.com/balderdashy/sails-generate/tree/v1.16.13/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->
### step1:configure datastores.js according to your system
```
{
    adapter:'sails-postgresql',
    host:'localhost',
    user:'postgres',
    password:'1234',
    database:'employees'
}
```


### Step2: go to this Route to Register Manager on Postman.

```

'POST /manager':'ManagerController.createManager',

```
### you can use this json data to register the Manager.
```
  {
        "name": "nishit",
        "contact": "8360281326",
        "email": "nishitarora@gmail.com",
        "password":"zapbuild1234"
  }
```
### Step3: go to login route to generate JWT token
login with valid email and password
```

{
  "email":"nishitarora@gmail.com",
  "password":"zapbuild1234"
}

```

```

'POST /manager/login' :'ManagerController.managerLogin',

```
### step4: include Token in Authorization Header on Postman to inorder to access the Following Routes of Employees.
```
  'POST /employee':'EmployeesController.createEmployee',
  'PATCH /employee/:id':'EmployeesController.updateEmployee',
  'DELETE /employee/:id':'EmployeesController.deleteEmployee',
  'GET /employee/:id':'EmployeesController.getEmployee',

```
