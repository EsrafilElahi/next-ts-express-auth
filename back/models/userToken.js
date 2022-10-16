const { DataTypes } = require('sequelize');
const sequelize = require("../db/connect_db")

const userToken = sequelize.define("Users", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    defaultValue: 1,
    unique: true,
  },
  token: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  }

})

module.exports = userToken