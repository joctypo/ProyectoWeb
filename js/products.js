import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const products = [
    {
        id: 1, 
        name: "Camiseta",
        price: 30.000,
        isRecommended: true,
        isBestSeller: false,
        image: "./images/product1.png",
        description: "Camiseta con detalle en el pecho hecho a mano",
        type: "camisetas"
    },

    {
        id: 2, 
        name: "Pin de Café",
        price: 15.000,
        isRecommended: false,
        isBestSeller: false,
        image: "./images/product2.png",
        description: "Pines de colores para chaquetas o maletas con forma de café",
        type: "pocillos"
    },
    {
        id: 3, 
        name: "Mugs",
        price: 25.000,
        isRecommended: false,
        isBestSeller: false,
        image: "./images/product3.png",
        description: "Mugs ideales para la oficina con estampado del logo del tintero",
    },
    {
        id: 4, 
        name: "Gorra Tintero",
        price: 10.000,
        isRecommended: false,
        isBestSeller: false,
        image: "./images/product4.png",
        description: "Gorra con detalle del logo bordado a mano",
    },
    {
        id: 5, 
        name: "Pocillo de aluminio",
        price: 25.000,
        isRecommended: false,
        isBestSeller: false,
        image: "./images/product5.png",
        description: "Pocillos de aluminio resistente con estilo vintage",
    },

];


products.forEach(async (product) => {
    await setDoc(doc(db, "products", `199A664F5151F${product.id}`), product);
});