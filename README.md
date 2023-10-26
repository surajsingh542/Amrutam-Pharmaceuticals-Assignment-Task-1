# Amrutam-Pharmaceuticals-Assignment-Task-1

## environment variables

Make the environment varialbles file in the root directory of project with names .env.development and .env.production

```bash
MONGO_URL = # url of mongo database
JWT_SECRET_KEY = # SECRET KEY FOR JWT
```

## Setup commands

If you want to recieve in app notifications do the following:-

1. Create a firebase project with your app package name
2. Add the firebase.json file in the root directory of project
3. Uncomment the lines in the server.js file

## Running Server

1. npm install

2. npm run dev

## Testing via Postman

1. Import the postman collection from the Postman Folder into Postman
2. Make api calls to test to:
   1. Register yourself as user
   2. Login yourself
   3. Set Reminders

## Notification

1. The schedule notification service has been implemented in the reminder.js file under controllers/reminders folder.

2. The sending email and sms logic can easily be implemented there using various services like twillo and nodemailer.

3. For demo purposes only sending in app notifications using firebase has been written uncomment it when you set up firebase.
