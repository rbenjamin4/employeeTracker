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

const addRole = async() => {
    const allDepartments = await viewDepartment()
}

module.exports = {
    viewRole,
    addRole
}