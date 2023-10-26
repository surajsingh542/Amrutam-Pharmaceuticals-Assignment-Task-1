const express = require("express");
const { reminderValidation } = require("../../utils/validationSchemas");
const { setReminderCtrl } = require("../../controllers/reminders/reminder");
const isLogin = require("../../middlewares/isLogin");

const reminderRoutes = express.Router();

reminderRoutes.post(
  "/set-reminder",
  reminderValidation,
  isLogin,
  setReminderCtrl
);

module.exports = reminderRoutes;
