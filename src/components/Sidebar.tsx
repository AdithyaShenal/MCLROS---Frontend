import { NavLink } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { LuMilk } from "react-icons/lu";
import { RiSettings3Line } from "react-icons/ri";
import { GrUserWorker } from "react-icons/gr";
import { PiTruckBold } from "react-icons/pi";
import { MdOutlineManageHistory } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import { TbEaseInOutControlPoints } from "react-icons/tb";

const Sidebar = () => {
  return (
    <>
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <NavLink
                to="."
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <FiHome
                  className="my-1.5 inline-block size-4"
                  strokeWidth={2}
                />
                <span className="is-drawer-close:hidden">Home</span>
              </NavLink>
            </li>

            {/* List item */}
            <li>
              <NavLink
                to="/farmer"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Farmers"
              >
                {/* Settings icon */}
                <GrUserWorker className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">Farmers</span>
              </NavLink>
            </li>

            {/* List item */}
            <li>
              <NavLink
                to="/fleet"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Fleet"
              >
                {/* Settings icon */}
                <PiTruckBold className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">Fleet</span>
              </NavLink>
            </li>

            {/* List item */}
            <li>
              <NavLink
                to="/production"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Production"
              >
                {/* Settings icon */}
                <LuMilk
                  className="my-1.5 inline-block size-4.5"
                  strokeWidth={2}
                />
                <span className="is-drawer-close:hidden">Production</span>
              </NavLink>
            </li>

            {/* List item */}
            <li>
              <NavLink
                to="/routing"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Routing"
              >
                {/* Settings icon */}
                <GrMapLocation className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">Route Optimize</span>
              </NavLink>
            </li>

            {/* List item */}
            <li>
              <NavLink
                to="/route_control"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Routing"
              >
                {/* Settings icon */}
                <TbEaseInOutControlPoints className="my-1.5 inline-block size-4.5" />
                <span className="is-drawer-close:hidden">Route Control</span>
              </NavLink>
            </li>

            {/* List item */}
            <li>
              <NavLink
                to="/route_history"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Routing"
              >
                {/* Settings icon */}
                <MdOutlineManageHistory className="my-1.5 inline-block size-4.5" />
                <span className="is-drawer-close:hidden">Route History</span>
              </NavLink>
            </li>

            {/* List item */}
            <li>
              <NavLink
                to="/config"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <RiSettings3Line className="my-1.5 inline-block size-4.5" />
                <span className="is-drawer-close:hidden">Configurations</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
