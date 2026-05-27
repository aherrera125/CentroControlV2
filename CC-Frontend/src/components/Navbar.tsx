import { NavLink } from "react-router-dom";

const menuItems = [
  { to: '/', label: 'Socios', icon: 'bi-speedometer2' },
  { to: '/nuevo-socio', label: 'Socio Nuevo', icon: 'bi-people' },
  { to: '/tipo-socio', label: 'Tipo de Socio', icon: 'bi-person-plus' },
  { to: '/pagos', label: 'Pagos', icon: 'bi-person-badge' },
  { to: '/reporte-pagos', label: 'Reporte de Pagos', icon: 'bi-bar-chart-line' },
  { to: '/reporte-socios', label: 'Reporte de Socios', icon: 'bi-table' },
  { to: '/usuarios', label: 'Usuarios', icon: 'bi-ui-checks-grid' },
  { to: '/alta-usuarios', label: 'Alta de usuarios', icon: 'bi-grid-3x3-gap' },
];

const Navbar = () => {
  return (
    <nav className="sidebar-nav">
      {menuItems.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        //onClick={closeSidebar}
        >
          <span className="nav-icon">
            <i className={`bi ${icon}`} aria-hidden="true"></i>
          </span>
          <span className="nav-text">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
