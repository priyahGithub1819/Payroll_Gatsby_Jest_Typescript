const mongoose = require("mongoose");
const con = require("../db/connection");
const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const iv = crypto.randomBytes(16);

const userCTCSchema = new mongoose.Schema({
  Emp_Id: {
    type: String,
    required: [true, "please Enter Employee Emp_Id"],
    unique: true,
  },
  CTC: {
    type: String,
    required: [true, "please Enter employee CTC"],
  },
  vi: {
    type: String,
  },
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

userCTCSchema.pre("insertMany", async function (next, docs) {
  try {
    docs.map(async function (doc, index) {
      // encript the CTC
      if (doc.CTC !== undefined) {
        let cipher = crypto.createCipheriv(
          algorithm,
          process.env.CTC_SECRETE_KEY.slice(0, 32),
          iv
        );
        let encryptedData = cipher.update(doc.CTC, "utf-8", "hex");
        encryptedData += cipher.final("hex");
        const base64String = Buffer.from(iv, "binary").toString("base64");
        doc.CTC = encryptedData;
        doc.vi = base64String;
      }
    });
  } catch (error) {}
  next();
});

//hash password
userCTCSchema.pre("save", async function (next) {
  if (this.CTC !== undefined) {
    let cipher = crypto.createCipheriv(
      algorithm,
      process.env.CTC_SECRETE_KEY.slice(0, 32),
      iv
    );
    let encryptedData = cipher.update(this.CTC, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    const base64String = Buffer.from(iv, "binary").toString("base64");
    this.CTC = encryptedData;
    this.vi = base64String;
  }
});

userCTCSchema.pre("updateOne", async function (next) {
  if (this.getUpdate().CTC !== undefined) {
    let cipher = crypto.createCipheriv(
      algorithm,
      process.env.CTC_SECRETE_KEY.slice(0, 32),
      iv
    );
    let encryptedData = cipher.update(this.getUpdate().CTC, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    const base64String = Buffer.from(iv, "binary").toString("base64");
    this.update({CTC:encryptedData,vi:base64String});
  }
});

const ctcModel = con.PAYROLL.model("CTCEmployee", userCTCSchema);
module.exports = ctcModel;
