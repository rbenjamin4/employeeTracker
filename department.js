const sequelize = require('./config/connection')
const inquirer = require('inquirer')
require('console.table')

const viewDepartment = async(start) => {
    const result = await sequelize.query('SELECT * FROM department')
    console.table(result[0])
    start()
}

const addDepartment = async(start) => {
    const response = await inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter the new department name:',
            name: 'newDept'
        }
]).then(async ({newDept}) => {
        const result = await sequelize.query(`INSERT INTO department (name) VALUES ('${newDept}');`)
        console.table(result)
        start()
    })
}

module.exports = {
    viewDepartment,
    addDepartment
}