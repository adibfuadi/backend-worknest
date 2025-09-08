import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDmPgKY8BIbGkUlbhQl6GkbvR6YqLFO4SM",
    authDomain: "laravelfirebasevue.firebaseapp.com",
    projectId: "laravelfirebasevue",
    storageBucket: "laravelfirebasevue.appspot.com",
    messagingSenderId: "921131197720",
    appId: "1:921131197720:web:d1b1d14a2d85c2e34d6a6d"
};

// Inisialisasi Firebase App
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { auth, signInWithEmailAndPassword };
