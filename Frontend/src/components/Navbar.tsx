import { NavLink } from "react-router-dom";

const menuItems = [  
  { to: '/socios', label: 'Socios', icon: 'bi-people' },
  { to: '/nuevo-socio', label: 'Nuevo Socio', icon: 'bi-person-plus' },
  { to: '/tipo-socio', label: 'Obra Social', icon: 'bi-person-vcard' },
  { to: '/reporte-socios', label: 'Reporte de Socios', icon: 'bi-bar-chart-line' },
  { to: '/pagos', label: 'Pagos', icon: 'bi-currency-dollar' },
  { to: '/reporte-pagos', label: 'Reporte de Pagos', icon: 'bi-bar-chart-line' },  
  /*{ to: '/usuarios', label: 'Usuarios', icon: 'bi-person' },
  { to: '/alta-usuarios', label: 'Alta de usuarios', icon: 'bi-person-plus' },*/
];

type NavbarProps = {
  onLinkClick?: () => void;
};

const Navbar = ({ onLinkClick }: NavbarProps) => {
  return (
    <nav className="sidebar-nav">
      {menuItems.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          onClick={onLinkClick}
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
