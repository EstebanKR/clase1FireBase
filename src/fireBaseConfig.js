// Importar Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Para base de datos

// Configuración de Firebase (sustituye con tus credenciales)
const firebaseConfig = {
    apiKey: "AIzaSyBH0dh3EVvxHFqolld7_ZNa2GJHHvNRnMM",
    authDomain: "clase1-ba64b.firebaseapp.com",
    projectId: "clase1-ba64b",
    storageBucket: "clase1-ba64b.firebasestorage.app",
    messagingSenderId: "317866286868",
    appId: "1:317866286868:web:472dc5de5f94c88de42c01"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportar servicios
export { db };
