const ErrorHandler = require("../utils/ErrorHandler");
const catchAysncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const candidateInfo = require("../model/candidateModel");

//To upload candidate info by Hr Admin
exports.createCandiInfo = catchAysncError(async (req, res, next) => {
  try {
    const candiInfo = await candidateInfo.insertMany(req.body);
    res.send(candiInfo);
    res.status(200).json(candiInfo);
  } catch (error) {
    if (error.code === 11000) {
      const err = { ...error };
      let errMessageArray = err.writeErrors[0].err.errmsg.split("key: ");
      let strErrMessage = errMessageArray[1];
      let empErrorKey = strErrMessage.split(': "')[0].split("{ ")[1];
      let empErrorValue = strErrMessage.split(': "')[1].split(`" }`)[0];
      let mainErrorMessage = `Candidate with ${empErrorKey} = ${empErrorValue} already exists`;
      return res.status(200).json({ success: false, error: mainErrorMessage });
    }
  }
});

// To get candidate information for Owner
exports.ownerData = catchAysncError(async (req, res, next) => {
  const candiInfo = await candidateInfo.find();
  res.status(200).json({ success: true, candiInfo });
});

exports.editCandiData = async (req, res) => {
  const candiInfo = await candidateInfo.updateOne(
    { candidateId: req.params.id },
    req.body
  );
  res.status(200).json({ success: true });
};

exports.singleCandi = async (req, res) => {
  const singleCandi = await candidateInfo.findOne({
    candidateId: req.params.id,
  });
  res.status(200).json(singleCandi);
};

exports.editRejectCandi = async (req, res) => {
  const candiInfo = await candidateInfo.updateOne(
    { candidateId: req.params.id },
    req.body
  );
  res.status(200).json({ success: true });
};
