const mongoose = require("mongoose");

// connect to mongoDB
const dbConnect = async () => {
  await mongoose.connect(process.env.MONGO_URL);
};

module.exports = dbConnect;
