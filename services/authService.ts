import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import {
    doc,
    setDoc,
    getDoc,
    collection,
    getDocs,
    updateDoc,
    query,
    where,
} from 'firebase/firestore';
import { auth, db } from './firebase';
import { User, UserStatus, UserData } from '../types';
import { SYLLABUS_TOPICS } from '../constants';

const ensureFirebaseIsConfigured = () => {
    if (!auth || !db) {
        throw new Error('Firebase (auth o db) no está inicializado. Por favor, revisa el archivo `services/firebase.ts` y asegúrate de que tu API Key es correcta.');
    }
};


const getInitialUserData = (): UserData => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    return {
        topics: SYLLABUS_TOPICS.map(t => ({...t})), // Deep copy
        tasks: [
            { id: 't1', text: 'Repaso Tema 3: Capacidades Físicas Básicas', date: formatDate(today), completed: true },
            { id: 't2', text: 'Resolver Supuesto Práctico de Inclusión', date: formatDate(today), completed: false },
            { id: 't3', text: 'Avanzar en la Introducción de la Programación', date: formatDate(tomorrow), completed: false },
        ]
    };
};

export const register = async (userData: { fullName: string; email: string; phone: string; password: string; reason?: string }): Promise<User> => {
    ensureFirebaseIsConfigured();
    // The `!` tells TypeScript that we've already checked and these are not null.
    const usersCollection = collection(db!, 'users');
    
    // Check if user email already exists in Firestore
    const q = query(usersCollection, where("email", "==", userData.email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        throw new Error('El correo electrónico ya está registrado.');
    }
    
    const userCredential = await createUserWithEmailAndPassword(auth!, userData.email, userData.password);
    const firebaseUser = userCredential.user;

    const newUser: User = {
        id: firebaseUser.uid,
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        passwordHash: '', // Not needed when using Firebase Auth
        reason: userData.reason,
        status: UserStatus.Approved, // User is approved instantly
        isAdmin: false,
        data: getInitialUserData(),
    };

    // Store user profile in Firestore
    await setDoc(doc(db!, 'users', firebaseUser.uid), newUser);
    
    // User is now registered and logged in. Return their profile.
    return newUser;
};

export const login = async (email: string, password: string): Promise<User> => {
    ensureFirebaseIsConfigured();
    const userCredential = await signInWithEmailAndPassword(auth!, email, password);
    const firebaseUser = userCredential.user;

    const userProfile = await getUserProfile(firebaseUser.uid);

    if (!userProfile) {
        // We couldn't find the profile. This is a definite error.
        await signOut(auth!); // Log the user out of Auth to prevent a broken state
        throw new Error('No se encontró el perfil del usuario. Por favor, verifique sus credenciales e inténtelo de nuevo.');
    }

    if (userProfile.status === UserStatus.Pending) {
        await signOut(auth!);
        throw new Error('Su solicitud de acceso está pendiente de aprobación por un administrador.');
    }

    if (userProfile.status === UserStatus.Revoked) {
        await signOut(auth!);
        throw new Error('Su acceso a la plataforma ha sido revocado. Contacte con un administrador.');
    }
    
    return userProfile;
};

export const logout = async () => {
    if(!auth) return; // Allow logout even if db is not configured
    await signOut(auth);
};

export const getUserProfile = async (userId: string): Promise<User | null> => {
    ensureFirebaseIsConfigured();
    const userDocRef = doc(db!, 'users', userId);
    try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
            return docSnap.data() as User;
        } else {
            console.warn(`No user profile found in Firestore for UID: ${userId}`);
            return null;
        }
    } catch (error) {
        console.error("Error fetching user profile with getDoc:", error);
        if (error instanceof Error && 'code' in error && error.code === 'unavailable') {
             throw new Error('No se pudo conectar a la base de datos. Comprueba tu conexión a internet.');
        }
        throw error; // Re-throw other errors
    }
};

export const getAllUsers = async (): Promise<User[]> => {
    ensureFirebaseIsConfigured();
    const usersCollection = collection(db!, 'users');
    const querySnapshot = await getDocs(usersCollection);
    return querySnapshot.docs.map(doc => doc.data() as User);
};

export const updateUserStatus = async (userId: string, newStatus: UserStatus): Promise<User | undefined> => {
    ensureFirebaseIsConfigured();
    const userDocRef = doc(db!, 'users', userId);
    await updateDoc(userDocRef, { status: newStatus });
    const profile = await getUserProfile(userId);
    return profile ?? undefined;
};

export const updateUserData = async (userId: string, newUserData: Partial<UserData>): Promise<User | undefined> => {
    ensureFirebaseIsConfigured();
    const userDocRef = doc(db!, 'users', userId);
    const currentUser = await getUserProfile(userId);

    if (currentUser) {
        const updatedData = { ...currentUser.data, ...newUserData };
        await updateDoc(userDocRef, { data: updatedData });
        return { ...currentUser, data: updatedData };
    }
    return undefined;
};