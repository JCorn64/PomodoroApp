import firebase from "firebase";

const API_KEY = process.env.API_KEY;
const AUTH_DOMAIN = process.env.AUTH_DOMAIN;
const DATABASE_URL = process.env.DATABASE_URL;
const PROJECT_ID = process.env.PROJECT_ID;
const STORAGEBUCKET = process.env.STORAGEBUCKET;
const MESSAGE_SENDER = process.env.MESSAGE_SENDER;
const APP_ID = process.env.APP_ID;



const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGEBUCKET,
    messagingSenderId: MESSAGE_SENDER,
    appId: APP_ID
  };

firebase.initializeApp(firebaseConfig);

export default firebase;