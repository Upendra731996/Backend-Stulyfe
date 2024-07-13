var admin = require("firebase-admin");

var serviceAccount = require("../../stulyfe-backend-firebase-adminsdk-qqy8k-66fb6c90ac.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;