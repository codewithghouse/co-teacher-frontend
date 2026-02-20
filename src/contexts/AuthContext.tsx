import { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import api from "@/api/client";
import { useAuthStore } from "@/store/authStore";

interface AuthContextType {
    user: User | any | null;
    loading: boolean;
    manualLogin: (user: any, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    manualLogin: () => { },
    logout: () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | any | null>(null);
    const [loading, setLoading] = useState(true);

    // Helper to handle manual (email/password) login state
    const manualLogin = (userData: any, token: string) => {
        localStorage.setItem('token', token);
        // Also save user to localStorage for persistence across reloads (simple version)
        localStorage.setItem('user_data', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        auth.signOut();
        localStorage.removeItem('token');
        localStorage.removeItem('user_data');
        setUser(null);
    };

    useEffect(() => {
        let mounted = true;

        // Check for legacy/manual user persistence first
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user_data');
        if (storedToken && storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (mounted) {
                    setUser(parsedUser);
                    // Optimization: If we have a cached user, we can stop loading early 
                    // while Firebase synchronizes in the background.
                    setLoading(false);
                }
            } catch (e) {
                console.error("Failed to parse stored user", e);
            }
        }

        const { setAuth, logout: storeLogout } = useAuthStore.getState();

        // PART 1: Listener must exist ONLY ONCE
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // Sync with backend in background
                    const idToken = await firebaseUser.getIdToken();
                    const res = await api.post("/auth/google", { idToken });
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('user_data', JSON.stringify(res.data.user || firebaseUser));
                        // SYNC: Update the global store for legacy components
                        setAuth(res.data.user || firebaseUser, res.data.token);
                    }
                    if (mounted) setUser(res.data.user || firebaseUser);
                } catch (error) {
                    console.error("Backend sync failed:", error);
                    if (mounted) setUser(firebaseUser); // Fallback to firebase user
                }
            } else {
                if (!localStorage.getItem('token')) {
                    if (mounted) setUser(null);
                    // SYNC: Clear legacy store
                    storeLogout();
                }
            }

            // If we didn't have a cached session, we must stop loading now
            if (mounted) setLoading(false);
        });

        return () => {
            mounted = false;
            unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, manualLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
