const { DataTypes } = require('sequelize');
const sequelize = require("../db/connect_db")

const Users = sequelize.define("Users", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  },
  
})
