import { useState } from "react";
import NavLinks from "./NavLinks";
import "./MainNavigation.css";
import SideDrawer from "./SideDrawer";
import Backdrop from "./Backdrop";
import LanguageSwitcher from "./LanguageSwitcher";

const MainNavigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {drawerOpen && <Backdrop onClick={() => setDrawerOpen(false)} />}
      {drawerOpen && (
        <SideDrawer onClose={() => setDrawerOpen(false)}>
          <nav className="main-nav_drawer">
            <NavLinks />
          </nav>
        </SideDrawer>
      )}
      <header className="main-header">
        <div className="header-container">
          <h1 className="main-navigation_title">NextHour</h1>

          <nav className="main-nav">
            <NavLinks />
          </nav>
          <LanguageSwitcher />
          <button className="menu-btn" onClick={() => setDrawerOpen(true)}>
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
