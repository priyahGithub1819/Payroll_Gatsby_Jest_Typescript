const mongoose = require("mongoose");
const con = require("../db/connection");

const confirmCandidateSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  empId: {
    type: String,
    unique: true,
  },
  designation: {
    type: String,
  },
  confirmationDate: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const confirmCandidateModel = con.PAYROLL.model(
  "Confirmcandidate",
  confirmCandidateSchema
);

module.exports = confirmCandidateModel;
