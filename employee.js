const sequelize = require('./config/connection')
const inquirer = require('inquirer')
require('console.table')

const viewEmployee = async(start) => {
    const result = await sequelize.query('SELECT * FROM employee')
    console.table(result[0])
    start()
}

const viewManagers = async() => {
    const result = await sequelize.query('SELECT * FROM employee WHERE manager_id IS NULL')
    console.table(result[0])
    return result[0]
}

const viewRole = async() => {
    const result = await sequelize.query('SELECT * FROM role')
    console.table(result[0])
    return result[0]
}

const addEmployee = async(start) => {
    const allEmployees = await viewManagers()
    const allRoles = await viewRole()
    let rolePrompt = []
    console.table(allEmployees)
    let managerPrompt = []
    for(let i = 0; i < allEmployees.length; i++){
        const object = {
            name: allEmployees[i].first_name + ' ' + allEmployees[i].last_name,
            value: allEmployees[i].id
        }
        managerPrompt.push(object)
    }
    for(let i = 0; i < allRoles.length; i++){
        const object = {
            name: allRoles[i].title, 
            value: allRoles[i].id
        }
        rolePrompt.push(object)
    }
    console.table(managerPrompt)
    const response = await inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the first name:',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'Enter the last name:',
            name: 'lastName'
        },
        {
            type: 'list',
            message: 'Choose a role below:',
            name: 'roleSelection',
            choices: rolePrompt
        },
        {
            type: 'list',
            message: 'Choose a manager below:',
            name: 'managerSelection',
            choices: managerPrompt
        }
    ]).then(async ({firstName,lastName,roleSelection,managerSelection}) => {
        const result = await sequelize.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', ${roleSelection}, ${managerSelection});`)
        console.table(result)
        start()
    })
}


module.exports = {
    viewEmployee, 
    addEmployee
}