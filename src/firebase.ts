import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDKVkwhNSxEd-kAXnwVHy443b1X917TmPI",
    authDomain: "binotify-premium.firebaseapp.com",
    projectId: "binotify-premium",
    storageBucket: "binotify-premium.appspot.com",
    messagingSenderId: "771977159482",
    appId: "1:771977159482:web:636b8dc06f0f29246b6603",
    measurementId: "G-J8FK82E69E"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);