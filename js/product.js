import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";
import { getFirestore, collection, getDocs, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

let products = [];
let cart = [];
let userLogged = null;

const productSection = document.getElementById("product");
const spinner = document.getElementById("spinner");
const productImage = document.getElementById("productImage");
const productName = document.getElementById("productName");
const productDescription = document.getElementById("productDescription");
const productPrice = document.getElementById("productPrice");
const productGallery = document.getElementById("gallery");
const customContent = document.getElementById("customContent");
const productCartButton = document.getElementById("addToCart");

const loadProductInfo = (product, productID) => {
    productName.innerText = product.name;
    productDescription.innerText = product.description;
    productPrice.innerText = `${formatCurrency(product.price)}`;
    productImage.setAttribute("src", product.image);


    productCartButton.addEventListener("click", e => {
        e.preventDefault();

        alert("Producto añadido!");

        const productAdded = {
            id: productID,
            name: product.name,
            image: product.image,
            price: product.price
        }
        console.log(productAdded)
        cart.push(productAdded);


        if (userLogged) {
            addProductsToCart(cart);
            console.log("agregó")
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        productCartButton.setAttribute("disabled", true);
    })

    if (product.images) {
        createGallery(product.image, product.images);
    }

    if (product.colors) {
        createSelectColors(product.colors);
    }
};


const createGallery = (image, images) => {

    const gallery = document.createElement("div");
    gallery.innerHTML = `<img src="${image}">`;
    images.forEach(image => {
        gallery.innerHTML += `<img src="${image}">`;
    });
    productGallery.appendChild(gallery);

    const productGalleryImages = document.querySelector(".product__image > #gallery > div");
    productGalleryImages.addEventListener("click", e => {

        if (e.target.tagName === "IMG") {
            const imageSource = e.target.currentSrc;
            productImage.setAttribute("src", imageSource);
        }
    });

};

const createSelectColors = (colors) => {
    const selectContent = document.createElement("div");
    const select = document.createElement("select");

    selectContent.innerHTML = "<label class='product__colors'>Colores disponibles</label>";

    colors.forEach(color => {
        select.innerHTML += `<option value="${color}">${color}</option>`;
    });


    selectContent.appendChild(select);
    customContent.appendChild(selectContent);

};

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const result = await getFirebaseCart(user.uid);
        cart = result.products;
        userLogged = user;
    } else {
        cart = getMyCart();
    }

    getAllProducts();
});

const getAllProducts = async () => {
    const collectionRef = collection(db, "products");
    const { docs } = await getDocs(collectionRef);

    const firebaseProducts = docs.map((doc) => {
        return {
            ...doc.data(),
            id: doc.id,
        }
    })

    firebaseProducts.forEach(product => { });
};


const getFirebaseCart = async (userId) => {
    const docRef = doc(db, "cart", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : {
        products: []
    }
};

const addProductsToCart = async (products) => {
    console.log(products)
    await setDoc(doc(db, "cart", userLogged.uid), {
        products
    });
};


const getProduct = async () => {
    const url = window.location.search;
    const searchParams = new URLSearchParams(url);
    const productId = searchParams.get("id");
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    productSection.classList.add("loaded");
    spinner.classList.add("loaded");

    loadProductInfo(data, productId);

}


getProduct();