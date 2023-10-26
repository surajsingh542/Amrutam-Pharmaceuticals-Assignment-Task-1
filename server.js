const express = require("express");
const dbConnect = require("./config/dbConnect");
const cors = require("cors");
const globalErrHandler = require("./middlewares/globalErrHandler");
const cookieParser = require("cookie-parser");
const AppErr = require("./utils/AppErr");
// const serviceAccount = require("./firebase.json");
const admin = require("firebase-admin");
const app = express();
const userRoute = require("./routes/users/user");
const reminderRoutes = require("./routes/reminders/reminder");

// ================ firebase app initialize (Uncomment below lines while using firbase for inapp notifications) ===================
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// ================= middlewares ==================

// cookie parser middleware
app.use(cookieParser());

// pass json data
app.use(express.json());
// pass form data
app.use(express.urlencoded({ extended: true }));

let allowedOrigins = ["http://localhost:3000"];

// cors middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        let msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new AppErr(msg, 500), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// ================ routes =================

// users route
app.use("/api/v1/user", userRoute);
//  Reminder Routes
app.use("/api/v1/reminder", reminderRoutes);

// Error handlers
app.use(globalErrHandler);

// ================== DB Connect & listen to server ================
const PORT = process.env.PORT || 9000;

const start = async () => {
  try {
    await dbConnect();
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(`Server Error ${error.message}`);
  }
};

start();
