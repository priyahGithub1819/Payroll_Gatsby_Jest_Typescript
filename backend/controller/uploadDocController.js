const ErrorHandler = require("../utils/ErrorHandler");
const catchAysncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const UploadDoc = require("../model/uploadDocModel.js");

//To upload document
exports.uploadDocument = catchAysncError(async (req, res, next) => {
  await UploadDoc.create(req.file);
  res
    .status(200)
    .json({ success: true, message: "File uploaded successfully." });
});

//To get all document
exports.getAllDocs = catchAysncError(async (req, res, next) => {
  const docs = await UploadDoc.find()
  res
    .status(200)
    .json({ success: true, docs });
});