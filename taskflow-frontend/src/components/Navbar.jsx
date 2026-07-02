import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
const token = localStorage.getItem("token");
function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  }

  return (
    <nav>
      <h2>TaskFlow</h2>

     <ul>
  <li>
    <Link to="/">Home</Link>
  </li>

  {token ? (
    <>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>

      <li>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </li>
    </>
  ) : (
    <>
      <li>
        <Link to="/login">Login</Link>
      </li>

      <li>
        <Link to="/register">Register</Link>
      </li>
    </>
  )}
</ul>
    </nav>
  );
}

export default Navbar;