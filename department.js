const sequelize = require('./config/connection')
require('console.table')

const viewDepartment = async(start) => {
    const result = await sequelize.query('SELECT * FROM department')
    console.table(result[0])
    start()
}

const addDepartment = async() => {
    viewDepartment()
}

module.exports = {
    viewDepartment,
    addDepartment
}