import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// =================================================================================
// ¡ACCIÓN REQUERIDA! RELLENA ESTO CON TUS DATOS DE FIREBASE
// =================================================================================
// El método anterior para leer la configuración no funcionaba en este entorno.
// Para arreglarlo, ahora debes pegar la configuración de tu proyecto de Firebase directamente aquí.
// Puedes encontrar este bloque de código en tu consola de Firebase > Configuración del proyecto > General (en la sección "Tus apps").
//
// 🚨 ADVERTENCIA DE SEGURIDAD MUY IMPORTANTE 🚨:
// Las claves que has compartido en nuestros chats anteriores están expuestas públicamente.
// DEBES IR A FIREBASE Y ELIMINARLAS AHORA MISMO Y CREAR UNAS NUEVAS.
// Pegar tus claves aquí hará que sean visibles para cualquiera que inspeccione tu web.
// Para proteger tu app, ve a Google Cloud Console, busca tu API key de Firebase
// y restríngela para que solo pueda ser usada desde el dominio de tu web.
// =================================================================================

const firebaseConfig = {
  // REEMPLAZA LOS SIGUIENTES VALORES CON LOS DE TU PROYECTO
  apiKey: "TU_API_KEY_DE_FIREBASE_AQUI",
  authDomain: "TU_AUTH_DOMAIN_AQUI",
  projectId: "TU_PROJECT_ID_AQUI",
  storageBucket: "TU_STORAGE_BUCKET_AQUI",
  messagingSenderId: "TU_MESSAGING_SENDER_ID_AQUI",
  appId: "TU_APP_ID_AQUI",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
