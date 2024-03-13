
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {  getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAArP4zeMMu0OT3Q1yX4XRyoHg4qsOf55Y",
  authDomain: "rtk-blog-44845.firebaseapp.com",
  projectId: "rtk-blog-44845",
  storageBucket: "rtk-blog-44845.appspot.com",
  messagingSenderId: "638684061453",
  appId: "1:638684061453:web:a6dd1db7dbe788994dda44"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)
//firebase-storage@system.gserviceaccount.com