const { body, param } = require("express-validator");
const User = require("../models/users/users");
const signUpValidation = [
  body("firstName").notEmpty().withMessage("First Name is required."),

  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please enter correct email.")
    .custom(async (value) => {
      const existingUser = await User.findOne({ email: value });
      if (existingUser) {
        throw new Error("Email Already in use");
      }
    }),

  body("contactNumber")
    .optional()
    .isLength({ min: 10, max: 10 })
    .withMessage("Contact Number must be 10 digits long")
    .isMobilePhone()
    .withMessage("Please enter a valid Contact Number."),

  body("password")
    .notEmpty()
    .withMessage("Password field is required")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be  between 8 to 20 characters"),
];

const loginInValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please enter correct email."),
  body("password")
    .notEmpty()
    .withMessage("Password field is required")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be  between 8 to 20 characters"),
];

const reminderValidation = [
  body("message")
    .optional()
    .isLength({ min: 2, max: 200 })
    .withMessage(
      "Message needs to have minimum 2 characters long and maximum of 200 characters."
    ),
  body("caretaker")
    .optional()
    .isMongoId()
    .withMessage("Please provide correct format of caretaker Id"),
  body("time").notEmpty().withMessage("Reminder Time is required."),
];

module.exports = { signUpValidation, loginInValidation, reminderValidation };
