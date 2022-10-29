const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieparser = require("cookie-parser");
const setHeadersOrigin = require("./middlewares/setHeadersOrigin");
const handleErrors = require("./middlewares/handleErrors");
const connectDB = require("./db/connect_db");
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const adminRoutes = require("./routes/adminPannel");
const usersRoutes = require("./routes/users");
const logger = require("./logger/index");
const { authenticate, authAdmin } = require("./middlewares/authenticated");
const Users = require("./models/users");

dotenv.config();
const app = express();
const port = process.env.PROJECT_PORT || 5050;

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(express.json());
let publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir));
app.use(setHeadersOrigin);
app.use(handleErrors);
app.use(cors({ origin: `http://localhost:${port ? port : 5050}/` }));

// log test
logger.error("log ascxxxxxxxxxxxxxxerrorasdsa in serve file")
logger.warn("log warn in dsaasdserve file")
logger.silly("log silly iasdn serve file")


// routes
app.get("/", async (req, res) => {
  res.json({ msg: "Home Page" });
});
app.use("/auth", authRoutes);

app.use(authenticate) // all below routes must be authenticated
app.use("/admin-pannel", authAdmin, adminRoutes); // handle authentication & admin middleware
app.use("/dashboard", dashboardRoutes);
app.use("/users", usersRoutes);

// 404 page
app.get("*", (req, res) => {
  res.send("404 not found page");
});

// start app
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
  logger.info("log info in serve file")
  connectDB();
});
