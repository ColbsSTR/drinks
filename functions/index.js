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
              sound: "glass_clink.wav",
              android_channel_id: "glass_clink",
            },
          })
          .then((response) => {
            console.log("Successfully sent message:", response);
          })
          .catch((error) => {
            console.log("Error sending message:", error);
          });
    });

exports.sendTestNotification = functions.firestore
    .document("TestNotifications/{notificationId}")
    .onWrite((change, context) => {
      admin
          .messaging()
          .sendToTopic("dev", {
            notification: {
              title: change.after.data().Header,
              body: change.after.data().Body,
              sound: "glass_clink.wav",
              android_channel_id: "glass_clink",
            },
          })
          .then((response) => {
            console.log("Successfully sent test message:", response);
          })
          .catch((error) => {
            console.log("Error sending test message:", error);
          });
    });
