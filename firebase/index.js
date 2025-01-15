// Import the Firebase modules
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore } from "firebase/firestore"

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAXuxrDtL2WEk2dYoRwGx68ImqZ--2UUuA",
    authDomain: "aasra-vikas.firebaseapp.com",
    projectId: "aasra-vikas",
    storageBucket: "aasra-vikas.firebasestorage.app",
    messagingSenderId: "443068244688",
    appId: "1:443068244688:web:41aa735abad528d2d4f4d5"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);


export { storage, ref, uploadBytes, getDownloadURL, db };