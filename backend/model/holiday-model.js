const mongoose = require("mongoose");
const con = require("../db/connection");

const holidaySchema = new mongoose.Schema({
  holidayData: {
    type: Object,
  },
});

const holidayModel = con.ACLMDB.model("holiday", holidaySchema);

module.exports = holidayModel;
