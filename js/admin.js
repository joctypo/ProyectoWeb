import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const creatorr = document.getElementById("creatorr");

const getUserInfo = async (userId) => {
    try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    } catch (e) { }

}

const verificationadmin = async (user) => {
    try {
        const userInfo = await getUserInfo(user.uid);
        console.log(userInfo);
        if (userInfo.isAdmin === true) {
            creatorr.classList.add("hidden");
            creatorr.classList.add("visible");
        } else {
            creatorr.classList.remove("hidden");
            creatorr.classList.remove("visible");
        }
    } catch (e) { }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        verificationadmin(user);
    } else { }
});
