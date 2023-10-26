const admin = require("firebase-admin");

async function sendAppNotification(data) {
  try {
    const { title, body, tokens } = data;
    await admin.messaging().sendMulticast({
      tokens,
      notification: {
        title,
        body,
      },
    });
    return { status: "success", message: "Successfully sent notifications!" };
  } catch (err) {
    return {
      status: "failed",
      message: err.message || "Something went wrong!",
    };
  }
}

module.exports = sendAppNotification;
