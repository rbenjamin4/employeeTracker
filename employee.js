const sequelize = require('./config/connection')
const inquirer = require('inquirer')

const viewEmployee = async() => {
    const result = await sequelize.query('SELECT * FROM employee')
    // console.log(result[0])
    return result[0]
}

const addEmployee = async() => {
    const allEmployees = await viewEmployee()
    console.log(allEmployees)
    const managerPrompt = []
    for(let i = 0; i < allEmployees.length; i++){
        const object = {
            name: allEmployees[i].first_name + ' ' + allEmployees[i].last_name,
            value: allEmployees[i].id
        }
        managerPrompt.push(object)
    }
    console.log(managerPrompt)
    const response = await inquirer.prompt([
        {
            type: 'list',
            message: 'Choose a manager below:',
            name: 'selection',
            choices: managerPrompt
        }])
        console.log(response)
}


module.exports = {
    viewEmployee, 
    addEmployee
}