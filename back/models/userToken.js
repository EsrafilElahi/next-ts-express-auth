const { DataTypes } = require('sequelize');
const sequelize = require("../db/connect_db")

const UserToken = sequelize.define("UserToken",
  {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    updatedAt: false,
    createdAt: true,
  }
)

module.exports = UserToken;