import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Navbar */}
        <NavBar />

        {/* Main Content */}
        <div className="flex-1 grow p-4">
          <Outlet />
        </div>

        {/* Footer */}
        <Footer />
      </div>
      <Sidebar />
    </div>
  );
};

export default Layout;
