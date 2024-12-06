// Importer les fonctions nécessaires depuis Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuration de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDQYvzkTxoiSoJQlx3TZZbtXfqTol1h-kI",
    authDomain: "app-react-ecommerce-7fe57.firebaseapp.com",
    projectId: "app-react-ecommerce-7fe57",
    storageBucket: "app-react-ecommerce-7fe57.firebasestorage.app",
    messagingSenderId: "887629855388",
    appId: "1:887629855388:web:4746398974be4a5c36cb59"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Authentification
const db = getFirestore(app);  // Accéder à Firestore

// Exporter auth et db pour les utiliser dans d'autres parties de votre app
export { auth, db };
