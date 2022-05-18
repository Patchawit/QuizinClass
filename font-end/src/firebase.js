import { initializeApp } from "firebase/app";
import * as database from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBpOXEJlIpJ_Dc7bZ0zhCfryjAbdj-hy4M",
    authDomain: "quiz-in-class.firebaseapp.com",
    databaseURL: "https://quiz-in-class-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "quiz-in-class",
    storageBucket: "quiz-in-class.appspot.com",
    messagingSenderId: "546399615119",
    appId: "1:546399615119:web:f87f9de5e5d320bff558fa"
  };

const app = initializeApp(firebaseConfig);

const db = database.getDatabase(app);

export {db}