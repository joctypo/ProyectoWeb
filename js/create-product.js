import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-storage.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const createProductForm = document.getElementById("createProduct");
const feedback = document.getElementById("feedback");

const imageUploadedReference = async (file) => {
    const storageRef = ref(storage, `products/images/${file.name}`);
    return await uploadBytes(storageRef, file);
};

const uploadMainImage = async (file) => {
    try {
        const image = await imageUploadedReference(file);
        return getDownloadURL(ref(storage, image.ref.fullPath));
    } catch (e) { }
};

const uploadGallery = async (files) => {

    const images = files.map(async (file) => {
        const image = await imageUploadedReference(file);
        return getDownloadURL(ref(storage, image.ref.fullPath));
    });

    return images;
}

const createProduct = async () => {
    const name = createProductForm.name.value;
    const price = createProductForm.price.value;
    const description = createProductForm.description.value;
    const type = createProductForm.type.value;
    const mainImage = createProductForm.image.files[0];
    const gallery = createProductForm.gallery.files;

    if (name && price && description && type && mainImage) {
        feedback.innerText = "Subiendo el producto...";
        try {

            const urlMainImage = await uploadMainImage(mainImage);
            let galleryImages = [];


            if (gallery.length) {
                const galleryUrls = await uploadGallery([...gallery]);
                galleryImages = await Promise.all(galleryUrls);
            }

            await addDoc(collection(db, "products"), {
                name,
                price,
                description,
                type,
                isRecommended: false,
                isBestSeller: false,
                image: urlMainImage,
                images: galleryImages,
            });
            feedback.innerText = "??Producto a??adido correctamente!";
        } catch (e) {
            feedback.innerText = "??algo sali?? mal!";
        }
    } else {
        alert("Completa todos los campos...");
    }
};

createProductForm.addEventListener("submit", e => {
    e.preventDefault();
    createProduct();
});