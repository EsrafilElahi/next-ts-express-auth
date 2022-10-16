const { DataTypes } = require('sequelize');
const sequelize = require("../db/connect_db")

const UserToken = sequelize.define("Users", {
  id: {
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

module.exports = UserToken