import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const creatorr= document.getElementById("creatorr");

const getUserInfo = async (userId) => {
    try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    } catch (e) {
        console.log(e);
    }

}

onAuthStateChanged(auth, (user) => {
    if (user) {
    
        console.log(user.uid)
        verificationadmin(user);
        
    } else {
        
    }
});

const verificationadmin = async (user) => {
    try {
 
        const userInfo = await getUserInfo(user.uid);
        
        console.log(userInfo);
        if(userInfo.isAdmin===true){

            console.log("entre")
            
            creatorr.classList.add("hidden");
            creatorr.classList.add("visible");
    
        }else{
            creatorr.classList.remove("hidden");
            creatorr.classList.remove("visible");
            console.log("No entre")
        }


    } catch (e) {
        if (e.code === "auth/user-not-found") {
            console.log("Este usuario no existe en nuestra base de datos");
        }
    }
}