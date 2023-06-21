const mongoose = require("mongoose");
const con = require("../db/connection");

const candidateSchema = new mongoose.Schema({
  candidateId: {
    type: String,
    trim: true,
    unique: true,
  },
  candidateName: {
    type: String,
    trim: true,
    required: [true, "Please enter full name of Employee"],
    maxLength: [30, "name cannot exceed 30 character"],
    minLenght: [4, "name must have more than 4 characters"],
  },
  eduQual: {
    type: String,
    trim: true,
    required: [true, "Please Enter candidate's qualification"],
  },
  primarySkill: {
    type: String,
    trim: true,
    required: [true, "Please Enter candidate's primary skills"],
  },
  secondarySkill: {
    type: String,
    trim: true,
    required: [true, "Please Enter candidate's Secondary skills"],
  },
  noticePeriod: {
    type: String,
    trim: true,
    required: [true, "Please Enter candidate's notice period"],
  },
  currentCTC: {
    type: String,
    trim: true,
    required: [true, "please Enter candidate's current CTC"],
  },
  expectedCTC: {
    type: String,
    trim: true,
    required: [true, "Please Enter candidate's expected CTC"],
  },
  candiStatus: {
    type: String,
    trim: true,
    default: "Pending",
  },
  rejectedMessage: {
    type: String,
    trim: true,
    default: "No reason mentioned yet",
    required: [true, "Please Enter candidate's reason for rejection"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const candidateModel = con.PAYROLL.model("candidateInfo", candidateSchema);

module.exports = candidateModel;
