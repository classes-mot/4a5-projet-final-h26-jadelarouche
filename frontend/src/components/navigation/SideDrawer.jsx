import "./SideDrawer.css";

const SideDrawer = ({ children, onClose }) => {
  return (
    <div className="side-drawer" onClick={onClose}>
      <div className="side-drawer-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default SideDrawer;
