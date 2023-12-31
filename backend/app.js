const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoDBConnect = require("connect-mongodb-session")(session);
const payrollUser = require("./routers/payroll-user-routing");
const ctcUpload = require("./routers/ctc-route");
const candiUpload = require("./routers/candidate-route");
const dotenv = require("dotenv");
const errormiddleware = require("./middleware/error");
dotenv.config({ path: "backend/config/config.env" });
const uploadDocument = require("./routers/upload-doc-router");
const uploadEmpPf = require("./routers/pf-emp-route")

const store = new mongoDBConnect({
  uri: process.env.MONGO,
  collection: "mySession",
});

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: `${process.env.SESSION_SECRET}`,
    cookie: { maxAge: Number(process.env.SESSION_EXPIRES) },
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

//payrollUser routing
app.use("/api/v2", payrollUser);

//ctcUpload routing
app.use("/api/v2", ctcUpload);

//Candidate info Upload routing
app.use("/api/v2", candiUpload);

//upload document
app.use("/api/v2", uploadDocument);

//upload employee pf
app.use("/api/v2", uploadEmpPf);

//error middleware
app.use(errormiddleware);

module.exports = app;