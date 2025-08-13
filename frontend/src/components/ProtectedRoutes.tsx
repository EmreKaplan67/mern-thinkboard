import {Navigate} from "react-router";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
    const {user, loading} = useAuth();
    if (loading) {
        return <Loader />;
    }
    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
}

export default ProtectedRoute;