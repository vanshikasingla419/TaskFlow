import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="home">
      <section className="hero">
        <h1>
          {token
            ? `Welcome Back, ${user?.username}! 👋`
            : "Welcome to TaskFlow"}
        </h1>

        <p>
          {token
            ? "Continue managing your tasks from your dashboard."
            : "Organize your tasks, manage deadlines, and stay productive with an easy-to-use task management application."}
        </p>

        <div className="hero-buttons">
          {token ? (
            <Link to="/dashboard" className="primary-btn">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/register" className="primary-btn">
                Get Started
              </Link>

              <Link to="/login" className="secondary-btn">
                Login
              </Link>
            </>
          )}
        </div>
      </section>

      <section className="features">
        <h2>Why Choose TaskFlow?</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>📝 Manage Tasks</h3>
            <p>Create, update and organize your daily tasks effortlessly.</p>
          </div>

          <div className="feature-card">
            <h3>📅 Due Dates</h3>
            <p>Keep track of deadlines and never miss an important task.</p>
          </div>

          <div className="feature-card">
            <h3>🔒 Secure</h3>
            <p>Your account is protected using JWT authentication.</p>
          </div>

          <div className="feature-card">
            <h3>⚡ Fast</h3>
            <p>Built with React, Express and MongoDB for great performance.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;