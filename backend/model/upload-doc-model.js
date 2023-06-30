const mongoose = require("mongoose");
const con = require("../db/connection");

const uploadSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  originalname: {
    type: String,
  },
  mimetype: {
    type: String,
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
});

const uploadFile = con.PAYROLL.model("payrollDoc", uploadSchema);

module.exports = uploadFile;
