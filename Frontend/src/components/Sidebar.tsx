import Navbar from "./Navbar";

type SidebarProps = {
  closeSidebar: () => void;
};

const Sidebar = ({ closeSidebar }: SidebarProps) => {
  return (
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
      <Navbar onLinkClick={closeSidebar} />
    </aside>
  );
};

export default Sidebar;
