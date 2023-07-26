const catchAsyncError = require("./catch-async-error");
const payrollUser = require("../model/payroll-user-model.js");
const ErrorHandler = require("../utils/error-handler");
const jwt = require("jsonwebtoken");

//new user
exports.isNewEmployee = catchAsyncError(async (req, res, next) => {
  if (req.session.isNewAuth) {
    const token = await jwt.verify(
      req.session.PayrollUserNewId,
      process.env.JWT_SECRET
    );
    req.newEmployee = await payrollUser.findOne({ empId: token.id });
    next();
  } else {
    return next(new ErrorHandler(`invalid employee`, 200));
  }
});

// old user
exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  if (req.session.isAuth) {
    const token = await jwt.verify(
      req.session.PayrollUserId,
      process.env.JWT_SECRET
    );
    req.employee = await payrollUser.findOne({ empId: token.id });
    next();
  } else {
    return next(new ErrorHandler(`please login first`, 200));
  }
});

//Roll base access
exports.isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.employee.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.employee.role} cannot use this resource`,
          200
        )
      );
    }
    next();
  };
};
