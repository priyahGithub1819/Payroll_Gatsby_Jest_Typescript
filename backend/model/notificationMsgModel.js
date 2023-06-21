const mongoose = require("mongoose");
const con = require("../db/connection");

const notificationMsgSchema = new mongoose.Schema({
  message: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const notificationMsgModel = con.PAYROLL.model(
  "Notification",
  notificationMsgSchema
);

module.exports = notificationMsgModel;
