import MainNavigation from "../navigation/MainNavigation";
import { Outlet } from "react-router-dom";

export default function Rout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
