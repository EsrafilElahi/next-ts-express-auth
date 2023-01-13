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
      default: false,
    },
  },
  { timestamps: true }, // to build createdAt & updatedAt fields automatically
  { collections: "users" }
);

const Users = mongoose.model("User", UserSchema);

module.exports = Users;
