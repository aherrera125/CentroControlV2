import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';



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
      <Sidebar></Sidebar>
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
