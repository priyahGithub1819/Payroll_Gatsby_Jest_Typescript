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
  singleEmployee,
  editEmployeePayroll,
  editEmployeeERP,
  getNewUsers,
} = require("../controller/payroll-user-controller");
const {
  isAdmin,
  isAuthenticated,
  isNewEmployee,
} = require("../middleware/is-authenticated");
const { createdBy, updatedBy } = require("../middleware/created-and-updated");

router.route("/login").post(loginUser);

//super-admin-login (not in used)
router
  .route("/payroll/user/create")
  .post(
    isAuthenticated,
    isAdmin("super-admin-login", "owner"),
    createdBy,
    createPayrollUser
  );

//super-admin-login
router
  .route("/payroll/user/update/:empId")
  .put(isAuthenticated, updatedBy, updatePayrollEmployee);

// (not in used)
router
  .route("/payroll/many-user/create")
  .post(
    isAuthenticated,
    isAdmin("superAdmin", "owner"),
    createdBy,
    createManyPayrollUser
  );

router.route("/payroll/user/all").get(isAuthenticated, getAllPayrollUser);

//Edit functionality routs
router
  .route("/single-emp/:id")
  .get(
    isAuthenticated,
    isAdmin("hrAdmin", "owner", "superAdmin"),
    singleEmployee
  );

router
  .route("/edit-emp/payroll/:id")
  .put(
    isAuthenticated,
    isAdmin("hrAdmin", "owner"),
    updatedBy,
    editEmployeePayroll
  );

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
router
  .route("/payroll/user/new")
  .get(isAuthenticated, isAdmin("superAdmin"), getNewUsers);

module.exports = router;
