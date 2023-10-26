const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    caretaker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    time: { type: Date, required: true },
    frequency: { type: Number, default: 1, required: true, min: 1 },
    scheduledDates: [
      {
        type: Date,
      },
    ],
    jobIds: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.jobIds;
        return ret;
      },
      virtuals: true,
    },
    toObject: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.jobIds;
        return ret;
      },
      virtuals: true,
    },
  }
);

const Reminders = mongoose.model("reminder", reminderSchema);
module.exports = Reminders;
