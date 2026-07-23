import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

type HeaderProps = {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
};

const Header = ({ sidebarOpen, onToggleSidebar }: HeaderProps) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme');
    const initialDark = storedTheme === 'dark';
    setDarkMode(initialDark);
    document.documentElement.dataset.theme = initialDark ? 'dark' : 'light';
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    window.localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div className="admin-main">
      <nav className="navbar admin-navbar navbar-expand bg-white">
        <div className="container-fluid px-3 px-lg-4">
          <button
            className="sidebar-toggle"
            type="button"
            onClick={onToggleSidebar}
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
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => setDarkMode((prev) => !prev)}
            >
              <i
                className={`bi ${darkMode ? 'bi-sun' : 'bi-moon-stars'}`}
                aria-hidden="true"
              ></i>
            </button>

            <button className="profile-button" type="button" aria-label="Alejandro Herrera">
              <span className="profile-avatar avatar-sm">AH</span>
              <span className="profile-name d-none d-sm-inline">Alejandro Herrera</span>
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
  );
};

export default Header;
