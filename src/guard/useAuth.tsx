import { useAuth } from "../context/AuthContext";

const useAuthStatus = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated;
};

export default useAuthStatus;
