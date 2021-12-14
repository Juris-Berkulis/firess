import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
//* - You can simply use 'import firebase from "firebase";' instead of the lines written above, and the application behavior will not change from this, but then a help message will appear in the browser with a recommendation to change the import.
import 'firebase/analytics';

//* Your web app's Firebase configuration:
const firebaseConfig = {
    apiKey: "AIzaSyDqSy9piTRngpO142FO9R3S_lnWkJAjmfs",
    authDomain: "messenger-fireactbase-211015.firebaseapp.com",
    databaseURL: "https://messenger-fireactbase-211015-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "messenger-fireactbase-211015",
    storageBucket: "messenger-fireactbase-211015.appspot.com",
    messagingSenderId: "1041822403889",
    appId: "1:1041822403889:web:38065ae1a6020278de7410",
    measurementId: "G-9DLJ8XX7KS"
};

//* Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.database();

export const profileRef = db.ref('profile');
export const chatsRef = db.ref('chats');
export const messagesRef = db.ref('messages');
export const deletedChatRef = db.ref('deletedChat');

firebase.analytics(app);
