const sequelize = require('./config/connection')

const viewDepartment = async() => {
    const result = await sequelize.query('SELECT * FROM department')
    console.log(result[0])
}

const addDepartment = async() => {
    viewDepartment()
}

module.exports = {
    viewDepartment,
    addDepartment
}