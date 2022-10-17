// const { Sequelize } = require("sequelize");

// // const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

// // const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
// //   host: 'localhost',
// //   dialect: 'mysql'
// // })

// const sequelize = new Sequelize('esrafil', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql'
// });


// module.exports = sequelize;


const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.DB_BASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB Connected ");
    })
    .catch((err) => {
      console.error(`Error connecting to the database. n${err}`);
    });

  mongoose.connection.on("connected", () => {
    console.log("Mongoose Connected");
  });
};

module.exports = connectDB;
