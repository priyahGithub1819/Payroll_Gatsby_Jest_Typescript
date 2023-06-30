const mongoose = require("mongoose");
const validator = require("validator");
const con = require("../db/connection");

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    unique: true,
    required: [true, "Please provide employee Id"],
  },
  name: {
    firstName: {
      type: String,
      required: [true, "Please provide employee first name"],
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: [true, "Please provide employee last name"],
    },
  },
  email: {
    type: String,
    unique: true,
    validate: [validator.isEmail, "Please provide valid email id"],
  },
  mobile: {
    countryCode: {
      type: String,
    },
    number: {
      type: Number,
      unique: true,
    },
  },
  gender: {
    type: String,
    required: [true, "Please provide employee gender"],
  },
  dateOfJoining: {
    type: String,
    required: [true, "Please provide employee Joining date"],
  },
  maritalStatus: {
    type: String,
  },
  probationPeriod: {
    type: Number,
  },
  confirmationDate: {
    type: Date,
  },
  lastWorkingDay: {
    type: Date,
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Please provide employee date of birth"],
  },

  employmentStatus: {
    type: String,
    required: [true, "Please provide employee status"],
    default: "active",
    enum: ["active", "inactive", "temporary Hold", "laid off"],
  },
  selectCount: {
    type: Number,
    default: 0,
  },
  employmentType: {
    type: String,
    required: [true, "Please provide employee type"],
    // enum:["FTE","Contractor","Intern"]
  },
  designation: {
    type: String,
    required: [true, "Please provide employee designation"],
  },
  department: {
    type: String,
    required: [true, "Please provide employee department"],
  },
  lastUpdatedBy: {
    employeeId: {
      type: String,
    },
    email: {
      type: String,
    },
    name: {
      firstName: {
        type: String,
      },
      middleName: {
        type: String,
      },
      lastName: {
        type: String,
      },
    },
    timeStamp: {
      type: Date,
    },
  },

  createdDetails: {
    createdBy: {
      employeeId: {
        type: String,
      },
      email: {
        type: String,
      },
      name: {
        firstName: {
          type: String,
        },
        middleName: {
          type: String,
        },
        lastName: {
          type: String,
        },
      },
      timeStamp: {
        type: Date,
      },
    },
    approvedBy: {
      employeeId: {
        type: String,
      },
      email: {
        type: String,
      },
      name: {
        firstName: {
          type: String,
        },
        middleName: {
          type: String,
        },
        lastName: {
          type: String,
        },
      },
      timeStamp: {
        type: Date,
      },
    },
  },
});

const employeeModel = con.ERP.model("employee", employeeSchema);

module.exports = employeeModel;
