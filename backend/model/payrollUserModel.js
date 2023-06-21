const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const con = require("../db/connection");

const payrollUserSchema = new mongoose.Schema({
  empId: {
    type: String,
    unique: true,
    required: [true, "Please Enter employee id"],
  },
  role: {
    type: String,
  },
  numberOfMember: {
    type: Number,
  },
  // status: {
  //   type: String,
  // },
  NameofSpouse: {
    type: String,
    required: false,
    set: (a) => (a === "" ? undefined : a),
  },
  relationship: {
    type: String,
    required: false,
    set: (b) => (b === "" ? undefined : b),
  },
  DOB: {
    type: String,
    required: false,
    set: (c) => (c === "" ? undefined : c),
  },
  child1: {
    type: String,
    required: false,
    set: (d) => (d === "" ? undefined : d),
  },
  child1Gender: {
    type: String,
    required: false,
    set: (m) => (m === "" ? undefined : m),
  },
  DOB1: {
    type: String,
    required: false,
    set: (e) => (e === "" ? undefined : e),
  },
  child2: {
    type: String,
    required: false,
    set: (f) => (f === "" ? undefined : f),
  },
  child2Gender: {
    type: String,
    required: false,
    set: (n) => (n === "" ? undefined : n),
  },
  DOB2: {
    type: String,
    required: false,
    set: (g) => (g === "" ? undefined : g),
  },
  NameofFather: {
    type: String,
    required: false,
    set: (h) => (h === "" ? undefined : h),
  },
  DOB3: {
    type: String,
    required: false,
    set: (i) => (i === "" ? undefined : i),
  },
  NameofMother: {
    type: String,
    required: false,
    set: (j) => (j === "" ? undefined : j),
  },
  NameofFather: {
    type: String,
    required: false,
    set: (k) => (k === "" ? undefined : k),
  },
  DOB4: {
    type: String,
    required: false,
    set: (l) => (l === "" ? undefined : l),
  },
  tempPassword: {
    type: String,
  },
  password: {
    type: String,
  },
  resetPasswordTimeOut: {
    type: Number,
  },
  ctc: {
    type: Number,
  },
  empStatus: {
    type: String,
    default: "Pending",
  },
  // selectCount: {
  //   type: Number,
  //   default: 0,
  // },
  updatedby: {
    empId: {type:String},
    // email: {type:String,required:true},
    date: {type:Date}
  },
  createdby: {
    empId: {type:String},
    // email: {type:String,required:true},
    date: {type:Date}
  }
});

//hash password
payrollUserSchema.pre("save", async function (next) {
  if (this.password !== undefined) {
    if (!this.isModified("password")) {
      return next();
    } else {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
  if (this.tempPassword !== undefined) {
    if (!this.isModified("tempPassword")) {
      return next();
    } else {
      this.tempPassword = await bcrypt.hash(this.tempPassword, 10);
    }
  }
});

// //compare temp password
// payrollUserSchema.methods.compareTempPassword = async function (enterPassword) {
//   const pass = await bcrypt.compare(
//     enterPassword.toString(),
//     this.tempPassword
//   );
//   return pass;
// };

//compare password
payrollUserSchema.methods.comparePassword = async function (enterPassword) {
  const pass = await bcrypt.compare(enterPassword.toString(), this.password);
  return pass;
};

payrollUserSchema.methods.getToken = async function () {
  return jwt.sign({ id: this.empId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const payrollUserModel = con.PAYROLL.model(
  "payrollEmployee",
  payrollUserSchema
);

module.exports = payrollUserModel;
