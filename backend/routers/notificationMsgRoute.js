const express = require("express");
const router = express.Router();
const { createNotificationMsg, getNotification } = require("../controller/notificationMsgController");
const {
  notification,
} = require("../controller/notificationMsgController")
const {
  isAdmin,
  isAuthenticated,
} = require("../middleware/isAuthenticated");

router
  .route("/payroll/notificationMsg/create")
  .post(isAuthenticated, isAdmin("owner", "HrAdmin"), createNotificationMsg);

module.exports = router;