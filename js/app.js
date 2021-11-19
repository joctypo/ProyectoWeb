const products = [
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

const cart = [];
const productsSection = document.getElementById("products");

const productTemplate = (item) => {
    const product = document.createElement("a");
    product.className= "product";
    product.setAttribute("href",`./pageproduct.html?id=${item.id}`)


    let tagHtml;

    if(item.isRecommended===true){
        tagHtml = '<span class="product__tag">Recomendado</span>'

    } else{tagHtml = ''
    }

    const isAdded = cart.some(product => product.id === item.id);


    product.innerHTML = `
                 <img src="${item.image}" alt="camiseta" class="product__image">
                <div class="product__description">
                        ${tagHtml}
                       <h2 class="product__price">${item.price}</h2>
                       <h3 class="product__name">${item.name}</h3>
                        <button class="product__cart">Carrito</button>

                </div>        
    `;
    productsSection.appendChild(product);

    const productCart = product.querySelector(".product__cart");

    productCart.addEventListener("click", e => { 
        e.preventDefault();
        alert("Product Added!");
        const productAdded = {
            id: item.id,
            name : item.name,
            image: item.image
        }
        cart.push(productAdded);
        productCart.setAttribute("disabled", true);
    })
};

products.forEach(product => {
    productTemplate(product);
});