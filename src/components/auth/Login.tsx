import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login: React.FC = () => {
    const { login } = useAuth()
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        // cek data validasi
        const storedUserData = localStorage.getItem("user");
        if (!storedUserData) {
            setError("No user found. Please register first.");
            return;
        }

        const { username: storedUsername, password: storedPassword } = JSON.parse(storedUserData);
        if (username === storedUsername && password === storedPassword) {
            setError("");
            login();
            navigate("/products"); // Redirect 
        } else {
            setError("Invalid credentials. Please try again / REGISTER FIRST.");
        }
    };

    const handleRegister = () => {
        navigate("/register");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-emerald-100">
            <div className="bg-yellow-200 p-8 rounded-lg shadow-2xl max-w-sm w-full">
                <h1 className="text-2xl font-semibold text-center mb-6">Login yu</h1>

                {error && <p className="text-red-500 text-md text-center mb-4 border-emerald-200">{error}</p>}

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

                <div className="mb-6">
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

                <button
                    onClick={handleLogin}
                    className="w-full bg-stone-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-stone-900"
                >
                    Login
                </button>

                <button
                    onClick={handleRegister}
                    className="w-full bg-green-500 text-white py-3 mt-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default Login;
