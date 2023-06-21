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

  // console.log("In")
  const payrollIds = await payrollUserModel.find({empStatus:"Confirmed"},{_id:0,empId:1})
  // console.log(payrollIds)

  for(let i=0;i<payrollIds.length;i++)
  {
    confirmedUser.set(payrollIds[i].empId,1)
  }

  for(let i=0;i<data.length;i++)
  {
    if(confirmedUser.has(data[i].Emp_Id))
    {
      // const z = new CtcEmployee({...data[i]})
      // console.log(1)
      await CtcEmployee.updateOne({Emp_Id:data[i].Emp_Id},{...data[i],createdBy:req.body.createdBy},{upsert:true})
      // await z.save()
      // console.log(2)
    }
    else
    {
      notUpdated.push(data[i].Emp_Id)
    }
  }

  // console.log(data)
  // console.log(notUpdated)

  if(notUpdated.length>0)
  {
    console.log(notUpdated);
    // console.log(5)
    return res.status(200).json({success:true,error:`Employee with ${notUpdated} not confirmed yet`})
  }
  // console.log(4)
  res.status(200).json({success:true,message:"added all the ctc"})





  // try {
  //   if (req.body.length < 1) {
  //     return next(new ErrorHandler("Please provide a data", 200));
  //   }
  //   const ctcInfo = await CtcEmployee.insertMany(req.body);
  //   res.status(200).json({
  //     success: true,
  //     message: "Employee CTC uploaded successfully",
  //     ctcInfo,
  //   });
  // } catch (error) {
  //   if (error.code === 11000) {
  //     const err = { ...error };
  //     let errMessageArray = err.writeErrors[0].err.errmsg.split("key: ");
  //     let strErrMessage = errMessageArray[1];
  //     let empErrorKey = strErrMessage.split(': "')[0].split("{ ")[1];
  //     let empErrorValue = strErrMessage.split(': "')[1].split(`" }`)[0];
  //     let mainErrorMessage = `Employee with ${empErrorKey} = ${empErrorValue} already exists`;
  //     return res.status(200).json({ success: false, error: mainErrorMessage });
  //   } else {
  //     res.status(200).json({ success: false, error: error.message });
  //   }
  // }
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
    // console.log(1)
    const basic = await employeeModel.findOne({employeeId:ctc.Emp_Id});
    // console.log(2)
    ctc.vi = undefined;
    resultData.push({...ctc._doc,Name:basic?basic.name?basic.name:"NA":"NA"})
  }
  // console.log(resultData)
  // console.log(allCtc)
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