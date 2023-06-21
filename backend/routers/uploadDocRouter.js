const express = require("express");
const router = express.Router();
const { uploadDocument , getAllDocs } = require("../controller/uploadDocController");
const upload = require("../utils/upload");
const {
  isAdmin,
  isAuthenticated,
  isNewEmployee,
} = require("../middleware/isAuthenticated");
// router.route("/document/upload").post( uploadDocument);
router.route("/document/upload").post(upload.single("myFile"), uploadDocument);
router.route("/document/all").get(getAllDocs);

module.exports = router;