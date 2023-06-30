const ErrorHandler = require("../utils/error-handler");
const catchAysncError = require("../middleware/catch-async-error");
const confirmCandidate = require("../model/confirm-candidate-model");

//create new employee
exports.createconfirmCandidate = catchAysncError(async (req, res, next) => {
  const { name, empId, confirmationDate, designation } = req.body;

  const confirmcandidate = await confirmCandidate.create(req.body);

  res.status(200).json({
    success: true,
    message: "Employee created successfully",
    employeeId: confirmCandidate.empId,
    tempPassword,
  });
});
