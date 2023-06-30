const ErrorHandler = require("../utils/error-handler");
const catchAysncError = require("../middleware/catch-async-error");
const ApiFeatures = require("../utils/api-features");
const UploadDoc = require("../model/upload-doc-model.js");

//To upload document
exports.uploadDocument = catchAysncError(async (req, res, next) => {
  await UploadDoc.create(req.file);
  res
    .status(200)
    .json({ success: true, message: "File uploaded successfully." });
});

//To get all document
exports.getAllDocs = catchAysncError(async (req, res, next) => {
  const docs = await UploadDoc.find();
  res.status(200).json({ success: true, docs });
});
