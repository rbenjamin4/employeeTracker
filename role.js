const inquirer = require('inquirer')
const sequelize = require('./config/connection')
require('console.table')

const viewRole = async() => {
    const result = await sequelize.query('SELECT * FROM role')
    console.table(result[0])
}

const viewDepartment = async(start) => {
    const result = await sequelize.query('SELECT * FROM department')
    console.table(result[0])
    return result[0]
}

const addRole = async(start) => {
    const allDepartments = await viewDepartment()
    console.table(allDepartments)
    let deptPrompt = []
    for(let i = 0; i < allDepartments.length; i++){
        const object = {
            name: allDepartments[i].name,
            value: allDepartments[i].id
        }
        deptPrompt.push(object)
    }
    console.table(deptPrompt)
    const response = await inquirer.prompt([
        {
            type: 'list',
            message: 'Select the department:',
            name: 'department',
            choices: deptPrompt
        },
        {
            type: 'input',
            message: 'Enter the title of the role:',
            name: 'title'
        },
        {
            type: 'input',
            message: 'Enter the salary for the role:',
            name: 'salary'
        }
    ]).then(async ({department, title, salary}) => {
        const result = await sequelize.query(`INSERT INTO role (title, salary, department_id) VALUES ('${title}', '${salary}', ${department});`)
        console.table(result)
        start()
    })
}

module.exports = {
    viewRole,
    addRole
}