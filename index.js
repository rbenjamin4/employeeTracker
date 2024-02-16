const sequelize = require('./config/connection')
const inquirer = require('inquirer')
const employee = require('./employee')
const role = require('./role')
const department = require('./department')

const start = async() => {
    const response = await inquirer.prompt([
        {
            type: 'list',
            message: 'Choose an option below:',
            name: 'selection',
            choices:[
                {
                    name: 'view employees',
                    value: 'VIEW EMP'
                },
                {
                    name: 'view roles',
                    value: 'VIEW ROLE'
                },
                {
                    name: 'view departments',
                    value: 'VIEW DEPT'
                },
                {
                    name: 'add employee',
                    value: 'ADD EMP'
                    
                },
                {
                    name: 'add role',
                    value: 'ADD ROLE'
                },
                {
                    name: 'add department',
                    value: 'ADD DEPT'
                }
            ]
        }
    ])

    // if (response.selection === 'VIEW EMP'){

    // }else if (response.selection === 'VIEW ROLE'){

    // }

    const { selection } = response

    switch(selection){
        case 'VIEW EMP': 
            employee.viewEmployee()
            break
        case 'VIEW ROLE':
            role.viewRole()
            break
        case 'VIEW DEPT':
            department.viewDepartment()
            break
        case 'ADD EMP':
            employee.addEmployee()
            break
        case 'ADD ROLE':
            role.addRole()
            break
        case 'ADD DEPT':
            department.addDepartment()
            break
    }

}

sequelize.sync({force: false}).then(start)