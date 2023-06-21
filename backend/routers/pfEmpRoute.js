const express = require("express");
const router = express.Router();
const {
  createPfEmpInfo,
  getAllPfEmp,
  singlePfEmployee,
  editPfEmployee
} = require("../controller/pfEmpController");
const {
  isAdmin,
  isAuthenticated,
  isNewEmployee,
} = require("../middleware/isAuthenticated");

const {createdBy,updatedBy} = require("../middleware/CreatedandUpdated")

//Creating route for HR admin to upload candidate's Info
router
  .route("/payroll/pfEmployee/all")
  .post(isAuthenticated, isAdmin("hrAdmin"), createdBy,createPfEmpInfo);

//To Display list
router
  .route("/pfEmp/data")
  .get(isAuthenticated, isAdmin("hrAdmin","superAdmin","technicalEmployee"), getAllPfEmp);

// edit functinality of an active pf employee

router
    .route("/single-pfemp/:id")
    .get(isAuthenticated, isAdmin("hrAdmin","superAdmin","technicalEmployee"), singlePfEmployee);

router
    .route("/edit-pfemp/:id")
    .put(isAuthenticated, isAdmin("hrAdmin"), updatedBy,editPfEmployee);

module.exports = router;
