const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.sendNotification = functions.firestore
    .document("Notifications/{notificationId}")
    .onWrite((change, context) => {
      admin
          .messaging()
          .sendToTopic("main", {
            notification: {
              title: change.after.data().Header,
              body: change.after.data().Body,
            },
          })
          .then((response) => {
            console.log("Successfully sent message:", response);
          })
          .catch((error) => {
            console.log("Error sending message:", error);
          });
    });
