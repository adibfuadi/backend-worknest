import admin from "firebase-admin";
// import * as serviceAccount from "../config/serviceAccount.json";

var serviceAccount = require("../config/serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
