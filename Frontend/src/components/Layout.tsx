//import { Outlet } from "react-router-dom";
//import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useEffect, useState } from "react";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('sidebar-open', sidebarOpen);
    return () => document.body.classList.remove('sidebar-open');
  }, [sidebarOpen]);

  const closeSidebar = () => setSidebarOpen(false);
  return (
    <div className={`admin-shell ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-backdrop" onClick={closeSidebar}></div>
      <Sidebar closeSidebar={closeSidebar} />
      <Header
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((value) => !value)}
      />
    </div>
  );
};

export default Layout;
