import { Outlet, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

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

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('sidebar-open', sidebarOpen);
    return () => document.body.classList.remove('sidebar-open');
  }, [sidebarOpen]);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className={`admin-shell ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-backdrop" onClick={closeSidebar}></div>

      <aside className="admin-sidebar" id="adminSidebar" aria-label="Main navigation">
        <div className="sidebar-header">
          <a className="brand-mark" href="#" aria-label="Centro de Jubilados dashboard">
            <span className="brand-icon">
              <i className="bi bi-grid-1x2-fill" aria-hidden="true"></i>
            </span>
            <span className="brand-copy">
              <span className="brand-title">Centro de Jubilados</span>
              <span className="brand-subtitle">Sistema de Gestión</span>
            </span>
          </a>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              onClick={closeSidebar}
            >
              <span className="nav-icon">
                <i className={`bi ${icon}`} aria-hidden="true"></i>
              </span>
              <span className="nav-text">{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="admin-main">
        <nav className="navbar admin-navbar navbar-expand bg-white">
          <div className="container-fluid px-3 px-lg-4">
            <button
              className="sidebar-toggle"
              type="button"
              onClick={() => setSidebarOpen((value) => !value)}
              aria-controls="adminSidebar"
              aria-expanded={sidebarOpen}
              aria-label="Toggle sidebar"
            >
              <span />
              <span />
              <span />
            </button>

            <form className="d-none d-md-flex ms-3 flex-grow-1" role="search">
              <input
                className="form-control search-input"
                type="search"
                placeholder="Search users, orders, reports"
                aria-label="Search"
              />
            </form>

            <div className="navbar-actions ms-auto">
              <button
                className="icon-button theme-toggle"
                type="button"
                aria-label="Switch color theme"
                title="Switch color theme"
              >
                <i className="bi bi-moon-stars" aria-hidden="true"></i>
              </button>

              <button className="profile-button" type="button" aria-label="Admin Hasan">
                <span className="profile-avatar avatar-sm">AH</span>
                <span className="profile-name d-none d-sm-inline">Admin Hasan</span>
              </button>
            </div>
          </div>
        </nav>

        <main className="dashboard-content">
          <div className="container-fluid px-3 px-lg-4 py-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
