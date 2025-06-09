import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (location.pathname === "/login") {
      setEmail("");
      setPassword("");
      setDob("");
      setError("");
    }
  }, [location.pathname]);

  const validUser = {
    email: "user@example.com",
    password: "password123",
    dob: "2002-01-09",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !dob) {
      setError("Please fill all fields");
      return;
    }

    if (
      email === validUser.email &&
      password === validUser.password &&
      dob === validUser.dob
    ) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/user-list");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-tr from-indigo-700 to-purple-600">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-80 sm:w-96">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

<form onSubmit={handleSubmit}>
  <div className="space-y-4">
    <input
      type="email"
      placeholder="Email"
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      type="password"
      placeholder="Password"
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <input
      type="date"
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      value={dob}
      onChange={(e) => setDob(e.target.value)}
    />
  </div>

  {/* Exact 2-line space (32px) before the Login button */}
  <div className="mt-8 flex justify-center">
    <button
      type="submit"
      className="w-[150px] bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
    >
      Login
    </button>
  </div>
</form>

        <p className="text-xs text-center text-gray-600 mt-4">
          Use your registered Email, Password, and Date of Birth to log in.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
