const Reminder = require("../../models/reminders/reminder");
const AppErr = require("../../utils/AppErr");
const { validationResult } = require("express-validator");
const schedule = require("node-schedule");
const User = require("../../models/users/users");
const sendAppNotification = require("../../utils/sendAppNotifications");
const randf = require("randomstring");

function nextDay(date) {
  let currentDate = new Date(date);

  // Increment the date by one day
  currentDate.setDate(currentDate.getDate() + 1);

  return currentDate;
}

const setReminderCtrl = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // find the user
    const userFound = await User.findById(req.user);
    req.body.user = userFound._id;

    // check if caretaker exists if provided
    if (req.body.caretaker) {
      const careTakerFound = await User.findById(req.body.caretaker);
      if (!careTakerFound) {
        return next(AppErr("CareTaker Not Found", 400));
      }
    }

    // create the reminder
    const reminderCreated = await Reminder.create(req.body);

    // saving reminder is in user model for reference
    userFound.reminders.push(reminderCreated._id);
    await userFound.save();

    // reminder scheduled date time
    let scheduleDate = req.body.time;

    // add the scheduled dates in the array
    for (let i = 0; i < reminderCreated.frequency; i++) {
      reminderCreated.scheduledDates.push(scheduleDate);
      let jobId = randf.generate(10);
      reminderCreated.jobIds.push(jobId);
      await reminderCreated.save();
      scheduleDate = nextDay(scheduleDate);
    }
    let i = 0;
    reminderCreated.scheduledDates.forEach((reminder) => {
      // console.log(new Date(reminder));
      schedule.scheduleJob(
        reminderCreated.jobIds[i++],
        new Date(reminder),
        async () => {
          console.log(
            "Implement sending email and message services here using nodemailer or twillo. Called @ time",
            new Date().toString()
          );
          // =========== sending in app notifications using firebase ============================
          /*
        let tokens = [];
        if (reminderCreated?.caretaker) {
          // get all caretaker device token
          const careTakers = await User.find({
            _id: reminderCreated.caretaker,
          });

          careTakers.forEach((careTaker) => {
            tokens = tokens.concat(careTaker.deviceToken);
          });
        }
        // get own device Token for self reminder
        tokens = tokens.concat(userFound.deviceToken);
        // create notification data
        const data = {
          title: "Prescription Reminder",
          body: reminderCreated.message,
          tokens,
        };
        // send notifications
        await sendAppNotification(data);
*/
          // ================== Similarly implement mail and messaging services by taking caretaker emails and phone number ===================
        }
      );
    });

    return res.json({ status: "success", data: reminderCreated });
  } catch (error) {
    return next(AppErr(error.message, 500));
  }
};

module.exports = { setReminderCtrl };
