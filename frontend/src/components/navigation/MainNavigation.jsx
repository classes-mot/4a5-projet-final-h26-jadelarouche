import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";

import "./MainNavigation.css";

const MainNavigation = () => {
  return (
    <header className="main-header">
      <h1 className="mainNavigation_title">NextHour</h1>
      <nav>
        <NavLinks />
      </nav>
    </header>
  );
};

export default MainNavigation;
