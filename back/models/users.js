const { DataTypes } = require('sequelize');
const sequelize = require("../db/connect_db")

const Users = sequelize.define("Users", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    DataTypes: DataTypes.STRING,
    allowNull: false,
  },
  confirmPassword: {
    DataTypes: DataTypes.STRING,
    allowNull: false,
  },
  job: {
    type: DataTypes.STRING,
  },
  birthData: {
    type: DataTypes.DATEONLY,
  },
  age: {
    type: DataTypes.NUMBER,
  },
  gender: {
    type: DataTypes.STRING
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Users;