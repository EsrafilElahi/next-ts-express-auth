// const { DataTypes } = require('sequelize');
// const sequelize = require("../db/connect_db")

// const Users = sequelize.define("Users", {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     allowNull: false,
//     autoIncrement: true,
//     defaultValue: 1,
//     unique: true,
//   },
//   firstName: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   lastName: {
//     type: DataTypes.STRING,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   // pass: {
//   //   DataTypes: DataTypes.INTEGER,
//   // },
//   // confirmPassword: {
//   //   DataTypes: DataTypes.STRING,
//   //   allowNull: false,
//   // },
//   gozar: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   job: {
//     type: DataTypes.STRING,
//   },
//   birthData: {
//     type: DataTypes.STRING,
//   },
//   age: {
//     type: DataTypes.INTEGER,
//   },
//   gender: {
//     type: DataTypes.STRING
//   },
//   isAdmin: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false
//   }
// })

// module.exports = Users;

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      index: true,
    },
    lastName: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    job: {
      type: String,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
    isAdmin: {
      type: Boolean,
    },
  },
  { timestamps: true }, // to build createdAt & updatedAt fields automatically
  { collections: "users" }
);

const Users = mongoose.model("User", UserSchema);

module.exports = Users;
