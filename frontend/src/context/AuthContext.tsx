import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import Loader from "../components/Loader";

type User = {
  _id: string;
  email: string;
  name: string;
} | null;

type AuthContextType = {
  user: User;
  setUser: (user: User) => void;
  loading: boolean;
  isRateLimited: boolean;
  setIsRateLimited: (value: boolean) => void;
};


const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState(true);
    const [isRateLimited, setIsRateLimited] = useState(false);    
    const checkAuth = async () => {
        try {
            const response = await api.get("/auth/check", {withCredentials: true});
            setUser(response.data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const responseInterceptor = api.interceptors.response.use(
            response => response,
            error => {
                if (error.response?.status === 429) {
                    setIsRateLimited(true);
                    setTimeout(() => setIsRateLimited(false), 60000); // hides after 1 minute
                }
                return Promise.reject(error);
            }
        );
        checkAuth();
        return () => {
            api.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, isRateLimited, setIsRateLimited }}>
            {!loading ? children : <Loader />}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};