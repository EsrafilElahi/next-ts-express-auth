const mongoose = require("mongoose");
const logger = require("../logger");

const connectDB = () => {
  mongoose
    .connect(process.env.DB_BASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logger.info("DB Connected ");
    })
    .catch((err) => {
      console.error(`Error connecting to the database : ${err}`);
    });

  mongoose.connection.on("connected", () => {
    logger.info("Mongoose Connected");
  });
};

module.exports = connectDB;
