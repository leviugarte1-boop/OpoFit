import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // ▼▼▼▼ ¡ACCIÓN NECESARIA! Pega tu API Key de Firebase aquí. ▼▼▼▼
  apiKey: "AIzaSyDNlwcUS7yG_tSVQob-VbTk65f954gLfVc",
  // ▲▲▲▲ Es el único valor que necesitas cambiar. ▲▲▲▲

  // El resto de la configuración ya está lista para ti.
  authDomain: "opofit-f43a9.firebaseapp.com",
  projectId: "opofit-f43a9",
  storageBucket: "opofit-f43a9.appspot.com", // Corregido al formato estándar para el SDK
  messagingSenderId: "362302821063",
  appId: "1:362302821063:web:0c0e4fd1bef3e94cc9e4e2",
};

let app, auth, db;
export const isFirebaseConfigured = firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith('TU_NUEVA_API_KEY');

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    // Usamos getFirestore() que es la forma estándar y más robusta.
    // Esto soluciona el problema de "cargando infinito" al permitir que
    // la autenticación del usuario se guarde correctamente.
    db = getFirestore(app);
  } catch (error) {
    console.error("Error al inicializar Firebase. Revisa que tu API Key sea correcta.", error);
  }
} else {
  console.warn("ADVERTENCIA: La configuración de Firebase está incompleta. Edita el archivo 'services/firebase.ts' para añadir tu API Key.");
}

export { app, auth, db };