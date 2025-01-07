import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; 
const Register: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = () => {
        // Validation
        if (!username || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const userData = { username, password };
        localStorage.setItem("user", JSON.stringify(userData));
        login();  // langsung ke authentikasi
        navigate("/products"); // Redirect langsung ke products
    };

    const handleBackToLogin = () => {
        navigate("/");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-emerald-100">
            <div className="bg-yellow-200 p-8 rounded-lg shadow-2xl max-w-sm w-full">
                <h1 className="text-2xl font-semibold text-center mb-6">Register</h1>

                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your username"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Confirm your password"
                    />
                </div>

                <button
                    onClick={handleRegister}
                    className="w-full bg-violet-500 text-white py-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    Register
                </button>

                <button
                    onClick={handleBackToLogin}
                    className="w-full bg-stone-800 text-white py-3 rounded-md mt-5 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    Back To Login
                </button>
            </div>
        </div>
    );
};

export default Register;
