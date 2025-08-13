import { NotebookPen, PlusIcon } from "lucide-react";
import { Link } from "react-router";
import LogoutButton from "./LogoutButton";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user } = useAuth();
    return (
        <header className="bg-base-300 border-b border-base-content/10">
            <div className="mx-auto max-w-6xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold font-mono tracking-tighter flex items-center gap-2">
                        <NotebookPen className="h-6 w-6" />
                        Thinkboard
                    </h1>
                    <div className="flex items-center gap-4">
                        {user && (
                            <Link 
                                to="/create" 
                                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                            >
                                <PlusIcon className="h-4 w-4" />
                                <span>Create a Note</span>
                            </Link>
                        )}
                        {user ? (
                            <LogoutButton />
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-ghost">Login</Link>
                                <Link to="/register" className="btn btn-primary">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;