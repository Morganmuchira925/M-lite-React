import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyDQZKuaMHQ-65XfGFP0bTKMmKsTx9JKE6k",
    authDomain: "m-lite-chat-app-30b2b.firebaseapp.com",
    projectId: "m-lite-chat-app-30b2b",
    storageBucket: "m-lite-chat-app-30b2b.firebasestorage.app",
    messagingSenderId: "332713997938",
    appId: "1:332713997938:web:10510a0149dc0051b6f4eb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export everything in one statement
export {
    auth,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
};

const messaging = getMessaging();

export const requestNotificationPermission = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            const token = await getToken(messaging, {
                vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,//Use the VAPID key here  
            });
            console.log("Notification token:", token);
        }
    } catch (error) {
        console.error("Error requesting notification permission:", error);
    }
};
