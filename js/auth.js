import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const registerForm = document.getElementById("register");
const loginForm = document.getElementById("login");
const logoutButton = document.getElementById("logout");
const googleButton = document.getElementById("google");
const creatorr = document.getElementById("creatorr");

const createUser = async (email, password, userFields) => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        const userId = user.uid;
        await setDoc(doc(db, "users", userId), userFields);
    } catch (e) {
        if (e.code === "auth/email-already-in-use") {
            console.log("Correo electrónico en uso...")
        }
        if (e.code === "auth/weak-password") {
            console.log("Intenta con una contraseña más segura...")
        }
    }
}

const login = async (email, password) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        const userInfo = await getUserInfo(user.uid);
        alert("Ingresó con éxito");
    } catch (e) { }
}

const getUserInfo = async (userId) => {
    try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    } catch (e) { }
}

const loginWithFacebook = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const userInfo = await getUserInfo(user.uid);
};

const logout = async () => {
    try {
        await signOut(auth);
        alert("Salió con éxito");
    } catch (e) { }
}

registerForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = registerForm.name.value;
    const email = registerForm.email.value;
    const password = registerForm.password.value;
    const city = registerForm.city.value;
    const address = registerForm.address.value;

    if (email && password) {
        createUser(email, password, {
            name,
            city,
            address,
            isAdmin: false,
        });
    } else { }

});

loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    if (email && password) {
        login(email, password);
    } else { }
});

googleButton.addEventListener("click", e => {
    loginWithFacebook();
});

logoutButton.addEventListener("click", e => {
    logout();
})

onAuthStateChanged(auth, (user) => {
    if (user) {
        loginForm.classList.add("hidden");
        logoutButton.classList.add("visible");
    } else {
        loginForm.classList.remove("hidden");
        logoutButton.classList.remove("visible");
    }
});

