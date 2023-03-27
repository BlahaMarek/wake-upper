import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAYL89nlmQh4tXo2_aqT_nKTSMPhFTtHAs",
    authDomain: "wake-upper-bc71d.firebaseapp.com",
    projectId: "wake-upper-bc71d",
    storageBucket: "wake-upper-bc71d.appspot.com",
    messagingSenderId: "350619145256",
    appId: "1:350619145256:web:6ad3338c465922d276111d"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export default getFirestore(app)
