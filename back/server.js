const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv").config();
const sequelize = require("./db/connect_db");

const app = express();
const port = process.env.PROJECT_PORT || 5050;

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
let publicDir = path.join(__dirname, "public")
app.use(express.static(publicDir));
app.use(cors({ origin: `http://localhost:${port ? port : 5000}/` }));

// routes
app.get("/", (req, res) => {
  res.send("Home Page");
});
app.get("*", (req, res) => {
  res.send("404 not found page");
});


// connect db
sequelize.sync({ force: true });
sequelize
  .authenticate()
  .then(() => {
    console.log("db connected!");
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("unable to connect db :", err);
  });