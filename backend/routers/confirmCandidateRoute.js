const express = require("express");
const router = express.Router();
const { createconfirmCandidate, getconfirmCandidate } = require("../controller/confirmCandidateContol");
const {
  isAdmin,
  isAuthenticated,
  isNewEmployee,
} = require("../middleware/isAuthenticated");


router
  .route("/payroll/confirmCandidate/create")
  .post(isAuthenticated, isAdmin("owner"), createconfirmCandidate);

module.exports = router;
