const ErrorHandler = require("../utils/ErrorHandler");
const catchAysncError = require("../middleware/catchAsyncError");
const PayrollUser = require("../model/payrollUserModel");
const ERPUser = require("../model/ERPemployeeModel");
const User = require("../model/userModel");
const CandiUser = require("../model/candidateModel");
const Leaves = require("../model/usersLeaveModel");
const HolidayList = require("../model/holidayModel");
const ApiFeatures = require("../utils/apiFeatures");
const CTC = require("../model/ctcModel");
const date = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let key = `${months[date.getMonth()]}${date.getFullYear()}`;
const ERPRequiredField = {
  _id: 0,
  employeeId: 1,
  name: 1,
  email: 1,
  mobile: 1,
  designation: 1,
  department: 1,
  dateOfBirth: 1,
  gender: 1,
  employmentStatus: 1,
  employmentType: 1,
  dateOfJoining: 1,
  probationPeriod: 1,
  confirmationDate: 1,
  maritalStatus: 1,
  selfDeclaration: 1,
  workMode: 1,
  workLocation: 1,
  selectCount: 1,
};

//without weekend
// function getBusinessDateCount(startDate, endDate) {
//   var elapsed, daysBeforeFirstSaturday, daysAfterLastSunday;
//   var ifThen = function (a, b, c) {
//     return a == b ? c : a;
//   };

//   elapsed = endDate - startDate;
//   elapsed /= 86400000;

//   daysBeforeFirstSaturday = (7 - startDate.getDay()) % 7;
//   daysAfterLastSunday = endDate.getDay();

//   elapsed -= daysBeforeFirstSaturday + daysAfterLastSunday;
//   elapsed = (elapsed / 7) * 5;
//   elapsed +=
//     ifThen(daysBeforeFirstSaturday - 1, -1, 0) +
//     ifThen(daysAfterLastSunday, 6, 5);

//   return Math.ceil(elapsed);
// }
function getBusinessDateCount(startDate, endDate) {
  let count = 0;
  let currentDate = new Date(startDate.getTime());

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();

    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      // Count the day if it's not a weekend day

      count++;
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }
  return count;
}

//create new employee (not in use)
exports.createPayrollUser = catchAysncError(async (req, res, next) => {
  // const {
  //   name,
  //   empId,
  //   email,
  //   dob,
  //   contactNo,
  //   gender,
  //   joiningDate,
  //   probationPeriod,
  //   confirmationDate,
  //   designation,
  //   location,
  //   department,
  //   role,
  //   numberOfMember,
  //   NameofSpouse,
  //   relationship,
  //   DOB,
  //   child1,
  //   DOB1,
  //   child2,
  //   DOB2,
  //   NameofFather,
  //   DOB3,
  //   NameofMother,
  //   DOB4,
  //   pan,
  //   pf,
  //   tempPassword,
  //   paymentType,
  //   bankName,
  //   bankBranch,
  //   ifscCode,
  //   accountNumber,
  //   ctc,
  // } = req.body;

  // if()
  // console.log("inside")

  const payrollUser = await PayrollUser.updateOne(
    { empId: req.body.empId },
    req.body
  );
  // console.log(req.body)

  res.status(200).json({
    success: true,
    message: "Employee added to payroll successfully",
    employeeId: payrollUser.empId,
  });
});

exports.updatePayrollEmployee = catchAysncError(async (req, res, next) => {
  const empId = req.params.empId;

  // if id is not found
  if (!empId) {
    return next(new ErrorHandler("Please provide employee Id", 200));
  }

  req.body.resetPasswordTimeOut = +new Date() + 60 * 60 * 1000;

  const payrollUser = await ERPUser.updateOne({ empId }, req.body);

  // console.log(payrollUser);

  res.status(200).json({
    success: true,
    message: "Employee added to payroll successfully",
    employeeId: payrollUser.empId,
    tempPassword: req.body.tempPassword,
  });
});

// Upload bulk employee (not sure)
exports.createManyPayrollUser = catchAysncError(async (req, res, next) => {
  const data = req.body;
  const newEmployeeErp = await PayrollUser.find(
    {
      $and: [
        { empId: { $exists: true } },
        { tempPassword: { $exists: false } },
        { password: { $exists: false } },
      ],
    },
    { _id: 0, empId: 1 }
  );

  let hashmap = new Map();
  newEmployeeErp.forEach((ele) => {
    if (!hashmap.get(ele.empId)) {
      hashmap.set(ele.empId, 1);
    } else {
      return next(new ErrorHandler(`${data[i].empId} is repeated`, 200));
    }
  });

  let notUpdated = [];

  for (let i = 0; i < data.length; i++) {
    if (hashmap.get(data[i].empId)) {
      await PayrollUser.updateOne(
        { empId: data[i].empId },
        { ...data[i], createdBy: req.body.createdBy }
      );
    } else {
      notUpdated.push(data[i].empId);
    }
  }
  if (notUpdated.length > 0) {
    return next(new ErrorHandler(`${notUpdated} not in ERP`));
  }

  res.status(200).json({ success: true, notUpdated });

  // } catch (error) {
  //   if (error.code === 11000) {
  //     const err = { ...error };
  //     let errMessageArray = err.writeErrors[0].err.errmsg.split("key: ");
  //     let strErrMessage = errMessageArray[1];
  //     let empErrorKey = strErrMessage.split(': "')[0].split("{ ")[1];
  //     let empErrorValue = strErrMessage.split(': "')[1].split(`" }`)[0];
  //     let mainErrorMessage = `Employee with ${empErrorKey} = ${empErrorValue} already exists`;
  //     return res.status(200).json({ success: false, error: mainErrorMessage });
  //   }
});

// get All employee (superAdmin)
exports.getAllPayrollUser = catchAysncError(async (req, res, next) => {
  const cond = req.query.cond ? req.query.cond : true;
  let employeeData = [];
  let payrollEmployee = await PayrollUser.find(
    {
      $and: [
        { empId: { $exists: true } },

        {
          $or: [
            { tempPassword: { $exists: true } },

            { password: { $exists: true } },
          ],
        },
      ],
    },
    { tempPassword: 0, password: 0 }
  ).sort({ emp_Id: 1 });
  // console.log(payrollEmployee)
  const erpEmployee = await ERPUser.find(
    { email: { $exists: cond } },
    ERPRequiredField
  ).sort({ emp_Id: 1 });
  // console.log(erpEmployee)
  // payrollEmployee = payrollEmployee.map((emp) => {
  //   let foundEmployee = erpEmployee.filter(
  //     (erpEmp) => erpEmp.employeeId === emp.empId
  //   )[0];
  //   // remove id of erp system
  //   console.log(foundEmployee)
  //   // foundEmployee[0].employeeId = undefined;

  //   // create array of employee data
  //   employeeData.push({ basic: foundEmployee, payrollData: emp });
  //   // console.log(employeeData);
  // });

  let payrollUser = new Map();

  for (let i = 0; i < payrollEmployee.length; i++) {
    payrollUser.set(payrollEmployee[i].empId, i);
  }

  erpEmployee.forEach((erpEmp) => {
    if (payrollUser.has(erpEmp.employeeId)) {
      employeeData.push({
        basic: erpEmp,
        payrollData: payrollEmployee[payrollUser.get(erpEmp.employeeId)],
      });
    }
  });

  // payrollEmployee.forEach((payEmp) => {
  //   for (let i = 0; i < erpEmployee.length; i++) {
  //     if (payEmp.empId === erpEmployee[i].employeeId) {
  //       erpEmployee[i].employeeId = undefined;
  //       employeeData.push({ basic: erpEmployee[i], payrollData: payEmp });
  //     }
  //   }
  // });

  // // join the collections
  // const employee = await PayrollUser.aggregate([
  //   {
  //     $lookup: {
  //       from: `ERP.employee`,
  //       localField: "empId",
  //       foreignField: "employeeId",
  //       as: "orders",
  //     },
  //   },
  // ]);
  // console.log(employeeData);
  // console.log("will send")
  res.status(200).json({ success: true, employeeData });
});

//Edit Functionality
exports.singleEmployee = async (req, res) => {
  const singleEmp = await PayrollUser.findOne({ empId: req.params.id });
  const erpEmployee = await ERPUser.findOne(
    { employeeId: singleEmp.empId },
    ERPRequiredField
  );
  const employee = { basic: erpEmployee, payrollData: singleEmp };
  res.status(200).json(employee);
};

// edit payroll data from here
exports.editEmployeePayroll = catchAysncError(async (req, res) => {
  const data = req.body;
  // console.log(req.params.id)

  const id = req.params.id;
  // console.log(data,id)
  if (!data) {
    return next(new ErrorHandler("No PayrollData was sent", 400));
  } else if (!id) {
    return next(new ErrorHandler("id was not sent", 400));
  }

  const acknowledge = await PayrollUser.updateOne({ empId: id }, data);

  res
    .status(200)
    .json({ success: true, message: "successfully updated employee" });
});

//edit ERP data from here
exports.editEmployeeERP = catchAysncError(async (req, res) => {
  const data = req.body;
  // console.log(req.params.id)
  const id = req.params.id;
  if (!data) {
    return next(new ErrorHandler("No PayrollData was sent", 400));
  } else if (!id) {
    return next(new ErrorHandler("id was not sent", 400));
  }
  // console.log(id,data);
  const acknowledge = await ERPUser.updateOne({ employeeId: id }, data);

  res.status(200).json({
    success: true,
    message: "successfully updated employee",
    acknowledge,
  });
});

//user login
exports.loginUser = catchAysncError(async (req, res, next) => {
  // console.log("here")
  const { username: empId, password } = req.body;

  if (!empId || !password) {
    return next(new ErrorHandler("Please enter empId & password", 200));
  }
  const all = await PayrollUser.find();
  // console.log(all)
  const payrollUser = await PayrollUser.findOne({ empId }).select(
    "+password +tempPassword"
  );
  // console.log(payrollUser)

  const erpUser = await ERPUser.findOne(
    { employeeId: empId },
    { employmentStatus: 1, _id: 0 }
  );
  // console.log(erpUser)
  if (!payrollUser) {
    return next(new ErrorHandler("PayrollUser not found", 200));
  }
  if (erpUser.employmentStatus !== "active") {
    return next(new ErrorHandler("Please contact with HR Department", 200));
  }

  if (payrollUser.tempPassword !== undefined) {
    if (payrollUser.tempPassword !== password) {
      return next(new ErrorHandler("Invalid empId or password", 200));
    } else if (Number(payrollUser.resetPasswordTimeOut) < +new Date()) {
      return next(
        new ErrorHandler("Password expired please connect with HR", 200)
      );
    } else {
      req.session.isNewAuth = true;
      req.session.PayrollUserNewId = await payrollUser.getToken();
      await payrollUser.save();

      res.status(200).json({
        success: true,
        message: "Please Enter new Password",
      });
    }
  } else {
    const isPasswordMatched = await payrollUser.comparePassword(password);
    if (isPasswordMatched === false) {
      return next(new ErrorHandler("Invalid empId or password", 200));
    } else {
      req.session.isAuth = true;
      req.session.PayrollUserId = await payrollUser.getToken();
      await payrollUser.save();
      res.status(200).json({
        success: true,
        role: payrollUser.role,
      });
    }
  }
});

// create new password (new employee)
exports.createPassword = catchAysncError(async (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return next(new ErrorHandler("Please fill all the field of form", 200));
  }
  let payrollUser = await PayrollUser.findOne({
    empId: req.newEmployee.empId,
  }).select("+password +tempPassword");
  if (!payrollUser) {
    return next(new ErrorHandler("Invalid employee", 200));
  } else if (payrollUser.password !== undefined) {
    return next(
      new ErrorHandler("This is not the first time to set password", 200)
    );
  } else {
    payrollUser.password = password;
    payrollUser.tempPassword = undefined;
    payrollUser.resetPasswordTimeOut = undefined;
    await payrollUser.save();
    req.session.destroy();
    res.status(200).json({ success: true, message: "Please login again" });
  }
});

// Logout User
exports.logout = catchAysncError(async (req, res, next) => {
  req.session.destroy();
  res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
});

// get load user
exports.loadUser = catchAysncError(async (req, res, next) => {
  const erpEmployee = await ERPUser.findOne(
    { employeeId: req.employee.empId },
    ERPRequiredField
  );
  const employee = { basic: erpEmployee, payrollData: req.employee };
  res.status(200).json({
    success: true,
    employee,
  });
});

// To get data for Hr admin
exports.adminData = catchAysncError(async (req, res, next) => {
  // const payrollUser = await PayrollUser.find();
  let employeeData = [];
  let payrollEmployee = await PayrollUser.find().sort({ emp_Id: 1 });
  const erpEmployee = await ERPUser.find(
    { email: { $exists: true } },
    ERPRequiredField
  ).sort({ emp_Id: 1 });
  payrollEmployee = payrollEmployee.map((emp) => {
    let foundEmployee = erpEmployee.filter(
      (erpEmp) => erpEmp.employeeId === emp.empId
    )[0];
    // remove id of erp system
    foundEmployee.employeeId = undefined;

    // create array of employee data
    employeeData.push({ basic: foundEmployee, payrollData: emp });
  });

  res.status(200).json(employeeData);
});

// // get data for admin
// exports.adminData = catchAysncError(async (req, res, next) => {
//   const payrollUser = await PayrollUser.find();
//   res.status(200).json(payrollUser);
// });

// user Data

exports.userData = catchAysncError(async (req, res, next) => {
  // variable declear

  const monthArray = [];

  let notFound = false;

  const finalData = {};

  let reqMonth;

  // fatching data

  const payrollUser = await PayrollUser.findOne({ _id: req.employee._id });
  const erpEmployee = await ERPUser.findOne({
    employeeId: payrollUser.empId,
  });

  // attendance database

  const user = await User.findOne(
    // { email: "priyah@uvxcel.com" },
    { email: erpEmployee.email },

    {
      attendance: 1,
    }
  );

  // checking leaves of user;

  const leaves = await Leaves.find({
    email: erpEmployee.email,

    status: "confirm",
  });

  // holliday calender

  const holiday = await HolidayList.find({}, { holidayData: 1, _id: 0 });

  // console.log(holiday[0].holidayData["2022"]["April"]);

  // console.log(leaves);
  // console.log(user);
  // if all attendance detail want

  if (req.query.month && isNaN(req.query.month) && req.query.month === "all") {
    monthArray.push(req.query.month);
  }

  // if want detaiil for 3 our 6 month
  else if (req.query.month && isNaN(req.query.month)) {
    let monthLength = Number(req.query.month.slice(0, 1)) - 1;

    while (monthLength >= 0) {
      reqMonth = new Date(
        new Date().getFullYear(),

        new Date().getMonth() - monthLength
      );

      if (+new Date(erpEmployee.dateOfJoining) < +reqMonth) {
        monthArray.push(reqMonth);
      }

      monthLength--;
    }
  }

  // if not query our only 1 month data
  else {
    const previousYearDate = new Date(
      req.query.year || new Date().getUTCFullYear(),

      req.query.month ? Number(req.query.month) + 1 : new Date().getMonth()
    )

      .toISOString()

      .split("T")[0];

    reqMonth = new Date(+new Date(previousYearDate) + 5.5 * 60 * 60 * 1000);

    if (+new Date(payrollUser.dateOfJoining) > +reqMonth) {
      return next(
        new ErrorHandler("Please select month after you joining date")
      );
    }

    monthArray.push(reqMonth);
  }

  // all month data of employee

  if (monthArray.length === 1 && monthArray[0] === "all") {
    // console.log("all");
  }

  // specific month data of employee
  else {
    // for (m of monthArray) {

    for (let m = 0; m < monthArray.length; m++) {
      const attendanceMonth = months[monthArray[m].getMonth()];
      const attendanceYear = monthArray[m].getFullYear();

      const key = `${attendanceMonth}${attendanceYear}`;

      if (user.attendance.length > 0) {
        for (let i = 0; i < user.attendance.length; i++) {
          notFound = false;

          if (!finalData[key]) {
            finalData[key] = {
              present: 0,

              "sick leave": 0,

              "casual leave": 0,

              "privilege leave": 0,

              holiday: 0,

              totalBusinessDay: 0,
            };
          }

          if (user.attendance[i][key]) {
            finalData[key].present = user.attendance[i][key].filter(
              (v) => v === true
            ).length;
          } else {
            // if only 1 month data want and its not present in database

            if (
              monthArray.length === 1 &&
              monthArray.length - 1 === m &&
              user.attendance.length - 1 === i &&
              JSON.stringify(finalData[key]) === "{}"
            ) {
              return next(
                new ErrorHandler(
                  `attendance not found for month ${attendanceMonth} of ${attendanceYear}`,

                  200
                )
              );
            }
          }
        }
      } else {
        notFound = true;

        break;
      }

      //sending error to client

      if (notFound === true) {
        return next(new ErrorHandler("Employee attendance not found", 200));
      }

      // holiday update here
      // console.log(attendanceYear);
      // console.log(holiday[0].holidayData[`${attendanceYear}`]);
      finalData[key].holiday = holiday[0].holidayData[`${attendanceYear}`]
        ? holiday[0].holidayData[`${attendanceYear}`][attendanceMonth].length
        : 0;

      // check date between variable

      const startDate = new Date(
        new Date(attendanceYear, months.indexOf(attendanceMonth), 2)
          .toISOString()
          .split("T")[0]
      );
      const endDate = new Date(
        new Date(attendanceYear, months.indexOf(attendanceMonth) + 1, 1)
          .toISOString()
          .split("T")[0]
      );
      // calculate business day in month

      finalData[key].totalBusinessDay = getBusinessDateCount(
        startDate,
        endDate
      );

      // find month leave and count the total leave on that month ans set it

      for (let j = 0; j < leaves.length; j++) {
        const sDate = new Date(leaves[j].startDate);

        const eDate = new Date(leaves[j].endDate);

        if (sDate >= +startDate && sDate <= +endDate) {
          if (eDate >= +startDate && eDate <= +endDate) {
            if (leaves[j].typeOfDay === "halfday") {
              finalData[key][leaves[j].typeOfLeave] +=
                getBusinessDateCount(sDate, eDate) / 2;
            } else {
              finalData[key][leaves[j].typeOfLeave] += getBusinessDateCount(
                sDate,

                eDate
              );
            }
          } else {
            if (leaves[j].typeOfDay === "halfday") {
              finalData[key][leaves[j].typeOfLeave] +=
                getBusinessDateCount(
                  sDate,

                  new Date(sDate.getFullYear(), sDate.getMonth() + 1, 0)
                ) / 2;
            } else {
              finalData[key][leaves[j].typeOfLeave] += getBusinessDateCount(
                sDate,

                new Date(sDate.getFullYear(), sDate.getMonth() + 1, 0)
              );
            }
          }
        } else if (eDate >= +startDate && eDate <= +endDate) {
          if (leaves[j].typeOfDay === "halfday") {
            finalData[key][leaves[j].typeOfLeave] +=
              getBusinessDateCount(
                new Date(eDate.getFullYear(), eDate.getMonth(), 1),

                eDate
              ) / 2;
          } else {
            finalData[key][leaves[j].typeOfLeave] += getBusinessDateCount(
              new Date(eDate.getFullYear(), eDate.getMonth(), 1),

              eDate
            );
          }
        }
      }
    }

    // console.log(finalData);
  }

  res.status(200).json({ success: true, finalData });
});

exports.getNewUsers = catchAysncError(async (req, res) => {
  const data = await PayrollUser.find(
    {
      $and: [
        { empId: { $exists: true } },
        { tempPassword: { $exists: false } },
        { password: { $exists: false } },
      ],
    },
    { _id: 0, empId: 1 }
  );
  return res.status(200).json({ success: true, data });
});
