import { useState } from "react";
import "../styles/Login.css";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/users/register", {
        username,
        email,
        password,
      });

      toast.success("Registration Successful!");

      navigate("/login");
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error("Registration Failed!");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Create Account 🚀</h1>

        <p className="subtitle">
          Join TaskFlow and organize your work efficiently
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="login-btn" type="submit">
            Register
          </button>
        </form>

        <p className="auth-link">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;