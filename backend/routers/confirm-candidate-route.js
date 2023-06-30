const express = require("express");
const router = express.Router();
const { createconfirmCandidate } = require("../controller/confirm-candidate-controller");
const {
  isAdmin,
  isAuthenticated,
  isNewEmployee,
} = require("../middleware/is-authenticated");


router
  .route("/payroll/confirmCandidate/create")
  .post(isAuthenticated, isAdmin("owner"), createconfirmCandidate);

module.exports = router;
