import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">

      <div className="container-fluid">

        <Link className="navbar-brand fw-bold" to="/dashboard">
          Laptop Pricing System
        </Link>

        <button
          className="btn btn-light"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </nav>

  );
}

export default Navbar;