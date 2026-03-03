
import { useState } from "react"
import axios from "axios"
axios.defaults.withCredentials = true;

import { Link, useNavigate } from "react-router-dom"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [role, setRole] = useState("")
  const navigate = useNavigate()

  const handleSignup = async e => {
    e.preventDefault()

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!role) {
      setError("Please select a role");
      return;
    }


    try {
      const response = await fetch("http://localhost:8080/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, email, password, role }),
      });
      const data = await response.json();
      if (response.ok) {

        

        
        // setUser( data.email)
        
        alert("sucessfully Created Account");
        navigate("/signIn")
      } else {
        setError(data.message || "signUp failed. Please try again.");
        alert("signUp Credentials");
        setUserName("")
        setEmail("");
        setPassword("");
        setRole("")
      }
    } catch (error) {
        alert("Something went wrong. Please try again.");
    }
  }
  //   try {
  //     const res = await axios.post("http://localhost:8080/api/signup", {
  //       username,
  //       email,
  //       password,
  //       role
  //     })
  //     alert(res.data.message)
  //     navigate("/signIn") // go back to login
  //   } catch (err) {
  //     alert(err.response?.data?.message || "Signup failed")
  //   }
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-pink-100 to-purple-100">
      <form
        onSubmit={handleSignup}
        className="bg-white w-85 p-6 rounded-xl shadow-xl"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Signup Form
        </h2>
        {error && (
          <p className="text-red-500 text-center mb-3">{error}</p>
        )}


        <div className="flex border rounded-full overflow-hidden mb-6">
          <Link
            to="/signIn"
            className="w-1/2 py-2 text-center text-gray-600"
          >
            Login
          </Link>

          <button
            type="button"
            className="w-1/2 py-2 bg-blue-600 text-white font-medium"
          >
            Signup
          </button>
        </div>

        <input
          type="text"
          placeholder="Enter UserName"
          className="w-full mb-3 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={e => setUserName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter Email Address"
          className="w-full mb-3 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={e => setEmail(e.target.value)}
          required
        />


        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={e => setPassword(e.target.value)}
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          // placeholder="Select Role"
          className="w-full mb-4 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Role</option>
          <option value="VENDOR">Vendor</option>
          <option value="CUSTOMER">Customer</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Signup
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/signIn" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}
