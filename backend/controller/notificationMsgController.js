const ErrorHandler = require("../utils/ErrorHandler");
const catchAysncError = require("../middleware/catchAsyncError");
const notificationMsg = require("../model/notificationMsgModel");

exports.createNotificationMsg = catchAysncError(async (req, res, next) => {
  const {
    message,
  } = req.body;

  const notificationMsg = await notificationMsg.create(req.body);
  res.status(200).json({
    success: true,
    employeeId: notificationMsg.empId,
  });
});
exports.notification = async (req, res) => {
  const msg = await notificationMsg.updateOne({ id: req.params.id }, req.body);
  res.send(msg);
  res.status(200).json({ success: true });
};
