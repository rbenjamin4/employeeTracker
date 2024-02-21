const sequelize = require('./config/connection')
const inquirer = require('inquirer')
require('console.table')

const viewEmployee = async(start) => {
    const result = await sequelize.query('SELECT * FROM employee')
    console.table(result[0])
    return result[0]
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
    const allManagers = await viewManagers()
    const allRoles = await viewRole()
    let rolePrompt = []
    console.table(allManagers)
    let managerPrompt = []
    for(let i = 0; i < allManagers.length; i++){
        const object = {
            name: allManagers[i].first_name + ' ' + allManagers[i].last_name,
            value: allManagers[i].id
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

const updateEmployee = async(start) => {
    const allEmployees = await viewEmployee()
    const allRoles = await viewRole()
    let rolePrompt = []
    console.table(allEmployees)
    let employeePrompt = []
    for(let i = 0; i < allEmployees.length; i++){
        const object = {
            name: allEmployees[i].first_name + ' ' + allEmployees[i].last_name,
            value: allEmployees[i].id
        }
        employeePrompt.push(object)
    }
    for(let i = 0; i < allRoles.length; i++){
        const object = {
            name: allRoles[i].title, 
            value: allRoles[i].id
        }
        rolePrompt.push(object)
    }
    console.table(rolePrompt)
    const response = await inquirer.prompt([
    { 
        type: 'list',
        message: 'Please select the employee you would like to update',
        name: 'employee',
        choices: employeePrompt
    },
    {
        type: 'list',
        message: 'Please select the employee\'s new role',
        name: 'role',
        choices: rolePrompt
    }
    ]).then(async ({employee, role}) => {
        const result = await sequelize.query(`UPDATE employee SET role_id = ${role} WHERE id = ${employee}`)
        console.table(result)
        start()
    })
}



module.exports = {
    viewEmployee, 
    addEmployee,
    updateEmployee
}