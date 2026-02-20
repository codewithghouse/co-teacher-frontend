import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, setPersistence, browserLocalPersistence } from "firebase/auth";

// Safe initialization to prevent app crash
let app;
let auth: any;
let googleProvider: any;

try {
    const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID
    };

    // Check if critical keys are present
    if (firebaseConfig.apiKey && firebaseConfig.projectId) {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);

        // PART 5: Ensure Firebase persistence is set
        // This promise might not resolve immediately, but it sets the flag for future sign-ins
        setPersistence(auth, browserLocalPersistence).catch((error) => {
            console.error("Firebase persistence error:", error);
        });

        googleProvider = new GoogleAuthProvider();
    } else {
        console.warn("Firebase config missing. Auth will not work.");
    }
} catch (error) {
    console.error("Firebase initialization failed:", error);
}

export { auth, googleProvider };

export const signInWithGoogle = async () => {
    if (!auth) {
        console.error("Firebase not initialized");
        throw new Error("Firebase configuration invalid");
    }
    try {
        // Persistence is already set above
        const result = await signInWithPopup(auth, googleProvider);
        const idToken = await result.user.getIdToken();
        return { user: result.user, idToken };
    } catch (error) {
        console.error("Error signing in with Google", error);
        throw error;
    }
};
