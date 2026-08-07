import { NavLink } from "react-router-dom";

function Sidebar() {

  return (

    <div className="bg-dark text-white p-3 vh-100">

      <h4 className="mb-4">
        Menu
      </h4>

      <ul className="nav flex-column">

        <li className="nav-item mb-2">
          <NavLink className="nav-link text-white" to="/dashboard">
            Dashboard
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink className="nav-link text-white" to="/categories">
            Categories
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink className="nav-link text-white" to="/components">
            Components
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink className="nav-link text-white" to="/configurations">
            Configurations
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink className="nav-link text-white" to="/pricing">
            Pricing
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/quotations">
            Quotations
          </NavLink>
        </li>

      </ul>

    </div>

  );
}

export default Sidebar;