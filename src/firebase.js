import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database' 
import { getAuth } from 'firebase/auth'

// Initialize Firebase
const fb = initializeApp({
  apiKey: "AIzaSyDUWQtzKCOx4KmX1jwr906iIxXRsWYdiew",
  authDomain: "number-59440.firebaseapp.com",
  databaseURL: "https://number-59440-default-rtdb.firebaseio.com/",
  projectId: "number-59440",
  storageBucket: "number-59440.appspot.com",
  messagingSenderId: "660427551486",
  appId: "1:660427551486:web:6cdfd5f3fd21453805ebaf",
  measurementId: "G-RNS3WHY858"
})

export const db = getDatabase(fb)
export const auth = getAuth(fb)