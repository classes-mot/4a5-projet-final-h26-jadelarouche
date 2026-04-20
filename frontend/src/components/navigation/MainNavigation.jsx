import { useState } from "react";
import { AuthContext } from "../context/auth-context";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import "./MainNavigation.css";
import SideDrawer from "./SideDrawer";
import Backdrop from "./Backdrop";

const MainNavigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawerHandler = () => setDrawerOpen(true);
  const closeDrawerHandler = () => setDrawerOpen(false);

  return (
    <>
      {drawerOpen && <Backdrop onClick={closeDrawerHandler} />}
      {drawerOpen && (
        <SideDrawer onClose={closeDrawerHandler}>
          <nav className="main-nav_drawer">
            <NavLinks pnLinkClick={closeDrawerHandler} />
          </nav>
        </SideDrawer>
      )}
      <header className="main-header">
        <div className="header-container">
          <h1 className="main-navigation_title">NextHour</h1>

          <nav className="main-nav">
            <NavLinks />
          </nav>

          <button className="menu-btn" onClick={openDrawerHandler}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
    </>
  );
};

export default MainNavigation;
