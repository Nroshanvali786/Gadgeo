import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

export default function Login({ setUser }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  // const [user, setUser] = useState("")
  const navigate = useNavigate()
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("userEmail")
  //   if (storedUser) {
  //     setUser(storedUser)
  //   }
  // }, [])

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        alert("Invalid Credentials");
        setEmail("");
        setPassword("");
        return;
      }

      // 🔥 Now fetch real logged-in user object
      const userRes = await fetch(`${BASE_URL}/api/me`, {
        credentials: "include",
      });

      const userData = await response.json();

      // ✅ Always store OBJECT
      setUser(userData);

      localStorage.setItem("role", userData.role);

      alert("Successfully Logged In");
      navigate("/");

    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-pink-100 to-purple-100">

      <form
        onSubmit={handleLogin}
        className="bg-white w-85 p-6 rounded-xl shadow-xl"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Login Form
        </h2>

        <div className="flex border rounded-full overflow-hidden mb-6">
          <button
            type="button"
            className="w-1/2 py-2 bg-blue-600 text-white font-medium"
          >
            Login
          </button>

          <Link
            to="/signUp"
            className="w-1/2 py-2 text-center text-gray-600 cursor-pointer"
          >
            Signup
          </Link>
        </div>

        <input
          type="email"
          placeholder="Email Address"
          className="w-full mb-3 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-2 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <p className="text-sm text-blue-600 text-left mb-4 cursor-pointer">
          Forgot password?
        </p>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-full font-semibold hover:bg-blue-700 transition cursor-pointer"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Not a member?{" "}
          <Link
            to="/signUp"
            className="text-blue-600 cursor-pointer font-medium"
          >
            Signup now
          </Link>
        </p>
      </form>
    </div>
  )
}


