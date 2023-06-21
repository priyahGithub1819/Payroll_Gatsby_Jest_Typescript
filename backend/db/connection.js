const mongoose = require("mongoose");

// //payroll system database connection
mongoose.PAYROLL = mongoose.createConnection(
  // "mongodb://0.0.0.0:27017/payroll_system",
  "mongodb+srv://atlaspriya:omsairamatlas1911@cluster0.mt7muf9.mongodb.net/payroll_system?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// ACLM system database coonection
mongoose.ACLMDB = mongoose.createConnection(
  "mongodb+srv://uvxcelAttendance:uvxcel12346@cluster0.ymiiq.mongodb.net/UvxcelAttendance?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// ERP system database coonection
// mongoose.ERP = mongoose.createConnection(
mongoose.ERP = mongoose.createConnection(
  "mongodb+srv://ERP-Management:ERP-uvxcel@erp-uvxcel.h2olxtm.mongodb.net/uvXcel?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose;
