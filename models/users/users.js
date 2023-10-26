const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 8,
      required: true,
    },
    contactNumber: {
      type: String,
    },
    deviceToken: [{ type: String }],
    reminders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reminder",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
        delete ret.fullname;
        return ret;
      },
      virtuals: true,
    },
    toObject: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.fullname;
        delete ret.__v;
        return ret;
      },
      virtuals: true,
    },
  }
);

userSchema.virtual("fullname").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.model("user", userSchema);
module.exports = User;
