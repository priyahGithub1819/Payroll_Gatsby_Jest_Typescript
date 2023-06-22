const ErrorHandler = require("../utils/ErrorHandler");
const catchAysncError = require("../middleware/catchAsyncError");
const CtcEmployee = require("../model/ctcModel");
const decodeCTC = require("../utils/decodeCtc");
const payrollUserModel = require("../model/payrollUserModel")
const employeeModel = require("../model/ERPemployeeModel");
const { request } = require("express");

exports.createCTC = catchAysncError(async (req, res, next) => {
  const data = req.body
  let confirmedUser = new Map();
  const notUpdated = [];

  if(!data)
  {
    return next( new ErrorHandler("Data was not provided",400))
  }

  const payrollIds = await payrollUserModel.find({empStatus:"Confirmed"},{_id:0,empId:1})
  for(let i=0;i<payrollIds.length;i++)
  {
    confirmedUser.set(payrollIds[i].empId,1)
  }

  for(let i=0;i<data.length;i++)
  {
    if(confirmedUser.has(data[i].Emp_Id))
    {
      await CtcEmployee.updateOne({Emp_Id:data[i].Emp_Id},{...data[i],createdBy:req.body.createdBy},{upsert:true})
    }
    else
    {
      notUpdated.push(data[i].Emp_Id)
    }
  }

  if(notUpdated.length>0)
  {
    return res.status(200).json({success:true,error:`Employee with ${notUpdated} not confirmed yet`})
  }
  res.status(200).json({success:true,message:"added all the ctc"})
});

exports.getMyCTC = catchAysncError(async (req, res, next) => {
  const employeeCTC = await CtcEmployee.findOne(
    { Emp_Id: req.employee.empId }
  );
  if (!employeeCTC) {
    return next(new ErrorHandler("User CTC not found"));
  }
  employeeCTC.CTC = await decodeCTC(employeeCTC.CTC, employeeCTC.vi);
  employeeCTC.vi = undefined;
  res.status(200).json({ success: true, employeeCTC });
});

exports.getAllCtc = catchAysncError(async (req, res, next) => {
  let resultData=[];
  const allCtc = await CtcEmployee.find();
  for (ctc of allCtc) {
    if (isNaN(ctc.CTC)) ctc.CTC = await decodeCTC(ctc.CTC, ctc.vi);
    const basic = await employeeModel.findOne({employeeId:ctc.Emp_Id});
    ctc.vi = undefined;
    resultData.push({...ctc._doc,Name:basic?basic.name?basic.name:"NA":"NA"})
  }
  res.status(200).json({
    success: true,
    resultData,
  });
});

//Edit
exports.singleCtc = async (req, res) => {
  const singleCtc = await CtcEmployee.findOne({ _id: req.params.id });
  singleCtc.CTC = await decodeCTC(singleCtc.CTC, singleCtc.vi);
  singleCtc.vi = undefined;
  res.status(200).json(singleCtc);
};

exports.editCtc = catchAysncError( async (req, res) => {
  const { CTC } = req.body;
  const id = req.params.id;
  if(!id || !CTC)
  {
    return next( new ErrorHandler("CTC or id field is empty",400))
  }
  let ctc = await CtcEmployee.findOne({ Emp_Id:req.params.id });
  if (!ctc) {
    return res
      .status(200)
      .json({ success: false, message: "User ctc not found" });
  }

  ctc.CTC = CTC;
  ctc.updatedBy = req.body.updatedBy
  ctc.save();
  res.send(req.body);
});