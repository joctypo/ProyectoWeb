import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";
import { getFirestore, collection, getDocs, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

let products = [
    {
        id: 1, 
        name: "Camiseta",
        price: "30.000",
        isRecommended: true,
        isBestSeller: false,
        image: "./images/product1.png",
        description: "",
    },

    {
        id: 2, 
        name: "Buzo",
        price: "30.000",
        isRecommended: false,
        isBestSeller: false,
        image: "./images/product1.png",
        description: "",
    },
    {
        id: 3, 
        name: "Buzo",
        price: "30.000",
        isRecommended: false,
        isBestSeller: false,
        image: "./images/product1.png",
        description: "",
    },
    {
        id: 4, 
        name: "Buzo",
        price: "30.000",
        isRecommended: false,
        isBestSeller: false,
        image: "./images/product1.png",
        description: "",
    },
    {
        id: 5, 
        name: "Buzo",
        price: "30.000",
        isRecommended: false,
        isBestSeller: false,
        image: "./images/product1.png",
        description: "",
    },
    {
        id: 6, 
        name: "Buzo",
        price: "30.000",
        isRecommended: false,
        isBestSeller: false,
        image: "./images/product1.png",
        description: "",
    }
];

let userLogged = null;
let cart = [];

const getAllProducts = async() => {
    const collectionRef = collection(db, "products");
    const { docs } = await getDocs(collectionRef);

    const firebaseProducts = docs.map((doc) => {
        return {
            ...doc.data(),
            id: doc.id,
        }
    })

    console.log(firebaseProducts);

    firebaseProducts.forEach(product => {
      
        productTemplate(product);
    });

    products = firebaseProducts;
};

const getMyCart = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
};

const getFirebaseCart = async (userId) => {
    const docRef = doc(db, "cart", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : {
        products: []
    }
};

const addProductsToCart = async (products) => {
    await setDoc(doc(db, "cart", userLogged.uid), {
        products
    });
};

const productsSection = document.getElementById("products");

const productTemplate = (item) => {
    const product = document.createElement("a");
    product.className= "product";
    product.setAttribute("href",`./pageproduct.html?id=${item.id}`)
    product.setAttribute("target", `_blank`);

    let tagHtml;

    if(item.isRecommended===true){
        tagHtml = '<span class="product__tag">Recomendado</span>'

    } else{tagHtml = ''
    }

    const isAdded = cart.some(product => product.id === item.id);
    
    let buttonHtml;

    if (isAdded) {
        buttonHtml = `<button class="product__cart" disabled>Producto añadido</button>`
    } else {
        buttonHtml = `<button class="product__cart">Añadir al carrito</button>`;
    }  

    product.innerHTML = `
                 <img src="${item.image}" alt="camiseta" class="product__image">
                <div class="product__description">
                        ${tagHtml}
                       <h2 class="product__price">${item.price}</h2>
                       <h3 class="product__name">${item.name}</h3>
                        ${buttonHtml}

                </div>        
    `;
    productsSection.appendChild(product);

    const productCartButton = product.querySelector(".product__cart");

    productCartButton.addEventListener("click", e => { 
        e.preventDefault();
        alert("Product Added!");
        const productAdded = {
            id: item.id,
            name : item.name,
            image: item.image,
            price: item.price
        }
        cart.push(productAdded);



        productCart.setAttribute("disabled", true);
    })
};

const filterByCategorySelect = document.getElementById("categories");
const orderBySelect = document.getElementById("orderBy");

const loadProducts = () => {

    const category = filterByCategorySelect.value || "";
    const order = orderBySelect.value || "";

    productsSection.innerHTML = "";

    let filteredProductsByCategory;

    if (category !== "") {
        filteredProductsByCategory = products.filter((product) => product.type === category);
    } else {
        filteredProductsByCategory = products;
    }

    if (order === "asc") {
        filteredProductsByCategory = filteredProductsByCategory.sort((a, b) => a.price - b.price);
    }

    if (order === "desc") {
        filteredProductsByCategory = filteredProductsByCategory.sort((a, b) => b.price - a.price);
    }
    
    filteredProductsByCategory.forEach(product => {
        productTemplate(product);
    });
}

filterByCategorySelect.addEventListener("change", e => {
    loadProducts();
});

orderBySelect.addEventListener("change", e => {
    loadProducts();
});


