const express = require("express");
const router = express.Router();
const {
  uploadDocument,
  getAllDocs,
} = require("../controller/uploadDocController");
const upload = require("../utils/upload");

router.route("/document/upload").post(upload.single("myFile"), uploadDocument);
router.route("/document/all").get(getAllDocs);

module.exports = router;
