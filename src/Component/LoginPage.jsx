import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import SiderBar from "./SiderBar";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        setError("");

        axios.post("https://fake-form.onrender.com/api/login", {
            email,
            password,
        })
            .then((response) => {
                if (response.data.success) {
                    localStorage.setItem("token", response.data.token);
                    navigate("/Dashboard");
                } else {
                    setError("Invalid email or password.");
                }
            })
            .catch(() => {
                setError("Login failed. Please try again.");
            });
    };

    return (
        <div className="flex w-full h-full gap-[30%]">
            <SiderBar/>
            <div className="flex  flex-col items-center justify-center h-screen bg-white">
            <h2 className="text-2xl font-bold mb-4 font-sans">Login</h2>

                <form onSubmit={handleLogin} className="bg-white p-10 rounded shadow-md w-[100%] h-[50%]">
                    

                    {error && <p className="text-red-500">{error}</p>}

                    <label className="block mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border p-2 rounded-md mb-4"
                        required
                    />

                    <label className="block mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-2 rounded-md mb-4"
                        required
                    />

                    <button type="submit" className="bg-red-900 text-white py-2 px-4 mt-10 rounded-md w-full">
                        Login
                    </button>
                </form>
            </div>
        </div>

    );
}

export default LoginPage;
