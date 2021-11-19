const firebaseConfig = {
    apiKey: "AIzaSyBbgHdCqZ7rxgpyT8xgNjaRq437VJUpjAs",
    authDomain: "carrito-365f8.firebaseapp.com",
    projectId: "carrito-365f8",
    storageBucket: "carrito-365f8.appspot.com",
    messagingSenderId: "232745723085",
    appId: "1:232745723085:web:896fe2481d39b9f9ac3584",
    measurementId: "G-XTD0Y8BCCF"
  };

  const formatCurrency = (price) => {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
    }).format(price);
};