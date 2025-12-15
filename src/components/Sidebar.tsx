import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3 sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink to="/" className="nav-link active">
              Dashboard
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/orders" className="nav-link">
              Orders
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/products" className="nav-link">
              Products
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
