const express = require("express");
const router = express.Router();
const {
    createCandiInfo,
    ownerData,
    editCandiData,
    singleCandi,
    editRejectCandi,
} = require("../controller/candidateController");
const {
    isAdmin,
    isAuthenticated,
    isNewEmployee,
} = require("../middleware/isAuthenticated");

//Creating route for HR admin to upload candidate's Info
router
    .route("/payroll/candidate/all")
    .post(isAuthenticated, isAdmin("hrAdmin"), createCandiInfo);

//To Display candidate list to Owner
router
    .route("/owner/data")
    .get(isAuthenticated, isAdmin("hrAdmin", "owner"), ownerData);

//To edit status of Candidate
router
    .route("/edit-candi/:id")
    .put(isAuthenticated, isAdmin("hrAdmin", "owner"), editCandiData);


router
    .route("/single-candi/:id")
    .get(isAuthenticated, isAdmin("hrAdmin", "owner"), singleCandi);

router
    .route("/edit-rejectcandi/:id")
    .put(isAuthenticated, isAdmin("hrAdmin", "owner"), editRejectCandi);

module.exports = router;