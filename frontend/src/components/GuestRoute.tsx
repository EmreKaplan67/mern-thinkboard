import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

// Prevents logged in users from accessing login and register pages
const GuestRoute = ({children}: {children: React.ReactNode}) => {
    const {user, loading} = useAuth();
    if (loading) {
        return <Loader />;
    }
    if (user) {
        return <Navigate to="/" />;
    }
    return children;
}

export default GuestRoute;