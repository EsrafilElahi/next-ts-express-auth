const { DataTypes } = require('sequelize');
const sequelize = require("../db/connect_db")

const Users = sequelize.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    defaultValue: 1
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  // pass: {
  //   DataTypes: DataTypes.INTEGER,
  // },
  // confirmPassword: {
  //   DataTypes: DataTypes.STRING,
  //   allowNull: false,
  // },
  gozar: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  job: {
    type: DataTypes.STRING,
  },
  birthData: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  gender: {
    type: DataTypes.STRING
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  refreshToken: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  }
})

module.exports = Users;