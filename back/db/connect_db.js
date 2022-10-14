const { Sequelize } = require("sequelize");

// const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

// const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
//   host: 'localhost',
//   dialect: 'mysql'
// })

const sequelize = new Sequelize('sql6526313', 'sql6526313', 'WeSgVr6xQR', {
  host: 'sql6.freemysqlhosting.net',
  dialect: 'mysql'
});


module.exports = sequelize;