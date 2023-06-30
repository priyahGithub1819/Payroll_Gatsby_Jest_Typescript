const catchAsyncError = require("./catch-async-error");


exports.updatedBy = catchAsyncError(async(req,res,next)=>{

    const now = new Date()
    req.body.updatedby = {empId:req.employee.empId,date:now}
    next()
})

exports.createdBy = catchAsyncError(async(req,res,next)=>{

    const now = new Date()
    req.body.createdby = {empId:req.employee.empId,date:now}
    next()
    
})