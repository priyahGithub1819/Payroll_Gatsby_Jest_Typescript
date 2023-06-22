const express = require("express");
const router = express.Router();
const {
  createCTC,
  getMyCTC,
  getAllCtc,
  singleCtc,
  editCtc,
} = require("../controller/ctcController");
const { isAdmin, isAuthenticated } = require("../middleware/isAuthenticated");
const { createdBy, updatedBy } = require("../middleware/CreatedandUpdated");

//Creating route for CTC
router.route("/payroll/ctc/create").post(isAuthenticated, createdBy, createCTC);
router.route("/payroll/user/ctc").get(isAuthenticated, getMyCTC);
router
  .route("/payroll/user/all/ctc")
  .get(isAuthenticated, isAdmin("owner"), getAllCtc);
module.exports = router;

//Edit functionality routs
router
  .route("/single-ctc/:id")
  .get(isAuthenticated, isAdmin("owner"), singleCtc);

router
  .route("/edit-ctc/:id")
  .put(isAuthenticated, isAdmin("owner"), updatedBy, editCtc);
