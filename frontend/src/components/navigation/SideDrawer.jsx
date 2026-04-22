import "./SideDrawer.css";

const SideDrawer = ({ children, onClose }) => {
  return (
    <>
      <div className="side-drawer-overlay" onClick={onClose} />
      <div className="side-drawer-content">{children}</div>
    </>
  );
};

export default SideDrawer;
