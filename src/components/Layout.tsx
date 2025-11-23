import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <NavBar />
          <div className="p-4">
            <Outlet />
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi
          </div>
        </div>

        <Sidebar />
      </div>
    </>
  );
};

export default Layout;
