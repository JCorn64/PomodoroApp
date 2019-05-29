import firebase from "firebase";

const API_KEY = process.env.API_KEY;
const AUTH_DOMAIN = process.env.AUTH_DOMAIN;
const DATABASE_URL = process.env.DATABASE_URL;
const PROJECT_ID = process.env.PROJECT_ID;
const STORAGE_BUCKET = process.env.STORAGEBUCKET;
const MESSAGING_SENDER_ID = process.env.MESSAGE_SENDER;
const APP_ID = process.env.APP_ID;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

firebase.initializeApp(firebaseConfig);

// handleClick = e => {
//   const contractsRef = firebase.database().ref("contracts");
//   const contract = {
//     name: this.state.name,
//     company: this.state.company,
//     details: this.state.details
//   };
//   contractsRef.push(contract); // Pushes user to firebase under "users" section
// };

export default firebase;
