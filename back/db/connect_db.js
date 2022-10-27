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
