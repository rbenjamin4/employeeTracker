const sequelize = require('./config/connection')

const viewRole = async() => {
    const result = await sequelize.query('SELECT * FROM role')
    console.log(result[0])
}

const addRole = async() => {
    viewRole()
}

module.exports = {
    viewRole,
    addRole
}