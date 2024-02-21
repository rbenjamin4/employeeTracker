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
                },
                {
                    name: 'update employee',
                    value: 'UPDATE EMP'
                },
                {
                    name: 'EXIT APPLICATION',
                    value: 'EXIT'
                }
            ]
        }
    ])

    const { selection } = response

    switch(selection){
        case 'VIEW EMP': 
            employee.viewEmployee(start)
            break
        case 'VIEW ROLE':
            role.viewRole(start)
            break
        case 'VIEW DEPT':
            department.viewDepartment(start)
            break
        case 'ADD EMP':
            employee.addEmployee(start)
            break
        case 'ADD ROLE':
            role.addRole(start)
            break
        case 'ADD DEPT':
            department.addDepartment(start)
            break
        case 'UPDATE EMP':
            employee.updateEmployee(start)
            break
        default:
            process.exit(0)
    }

}

sequelize.sync({force: false}).then(start)