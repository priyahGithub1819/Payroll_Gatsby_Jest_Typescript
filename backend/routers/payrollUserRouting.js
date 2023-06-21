const express = require("express");
const router = express.Router();
const {
  createPayrollUser,
  createManyPayrollUser,
  loginUser,
  createPassword,
  updatePayrollEmployee,
  logout,
  loadUser,
  adminData,
  userData,
  getAllPayrollUser,
  candidateUser,
  singleEmployee,
  editEmployeePayroll,
  editEmployeeERP,
  getNewUsers
} = require("../controller/payrollUserControl");
const {
  isAdmin,
  isAuthenticated,
  isNewEmployee,
} = require("../middleware/isAuthenticated");
const {createdBy,updatedBy} = require("../middleware/CreatedandUpdated")

router.route("/login").post(loginUser);

//superAdmin (not in used)
router
  .route("/payroll/user/create")
  .post(isAuthenticated, isAdmin("superAdmin", "owner"),createdBy, createPayrollUser);

//superAdmin
router.route("/payroll/user/update/:empId").put(isAuthenticated,updatedBy,updatePayrollEmployee);

// (not in used)
router
  .route("/payroll/many-user/create")
  .post(isAuthenticated, isAdmin("superAdmin", "owner"),createdBy,createManyPayrollUser);

router
  .route("/payroll/user/all")
  .get(isAuthenticated, getAllPayrollUser);

//Edit functionality routs
router
  .route("/single-emp/:id")
  .get(isAuthenticated, isAdmin("hrAdmin", "owner", "superAdmin"), singleEmployee);

router
  .route("/edit-emp/payroll/:id")
  .put(isAuthenticated, isAdmin("hrAdmin", "owner"),updatedBy,editEmployeePayroll);


router
.route("/edit-emp/erp/:id")
.put(isAuthenticated, isAdmin("hrAdmin", "owner"), editEmployeeERP);

// user
router.route("/payroll/user/password/new").put(isNewEmployee, createPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticated, loadUser);
router
  .route("/admin/data")
  .get(isAuthenticated, isAdmin("superAdmin", "hrAdmin"), adminData);
router.route("/user/data").get(isAuthenticated, userData);

//New employee from ERP
router.route("/payroll/user/new").get(isAuthenticated,isAdmin("superAdmin"),getNewUsers)

module.exports = router;
