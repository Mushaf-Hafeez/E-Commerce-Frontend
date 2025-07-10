import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { CgProfile } from "react-icons/cg";
import { VscDiffAdded } from "react-icons/vsc";
import { LayoutList, ListOrdered, Package } from "lucide-react";

const Sidebar = () => {
  const { role } = useSelector((state) => state.profile);

  return (
    <aside className="h-full w-full bg-zinc-100 dark:bg-zinc-950 flex flex-col gap-2">
      <NavLink
        to={"/dashboard/profile"}
        className={({ isActive }) =>
          `flex items-center gap-2 justify-center sm:justify-start px-4 py-2 ${
            isActive
              ? "dark:bg-zinc-900 border-r-primary border-r-4"
              : "border-none"
          }`
        }
      >
        <CgProfile size={"28"} />
        <span className="hidden sm:block">Profile</span>
      </NavLink>
      {/* my orders */}
      <NavLink
        to={"/dashboard/myOrders"}
        className={({ isActive }) =>
          `flex items-center gap-2 justify-center sm:justify-start px-4 py-2 ${
            isActive
              ? "dark:bg-zinc-900 border-r-primary border-r-4"
              : "border-none"
          }`
        }
      >
        <ListOrdered size={"28"} />
        <span className="hidden sm:block">My Orders</span>
      </NavLink>
      {role === "seller" && (
        <NavLink
          to={"/dashboard/add-product"}
          className={({ isActive }) =>
            `flex items-center gap-2 justify-center sm:justify-start px-4 py-2 ${
              isActive
                ? "dark:bg-zinc-900 border-r-primary border-r-4"
                : "border-none"
            }`
          }
        >
          <VscDiffAdded size={"28"} />
          <span className="hidden sm:block">Add Product</span>
        </NavLink>
      )}
      {role === "seller" && (
        <NavLink
          to={"/dashboard/product-list"}
          className={({ isActive }) =>
            `flex items-center gap-2 justify-center sm:justify-start px-4 py-2 ${
              isActive
                ? "dark:bg-zinc-900 border-r-primary border-r-4"
                : "border-none"
            }`
          }
        >
          <LayoutList size={"28"} />
          <span className="hidden sm:block">Product List</span>
        </NavLink>
      )}
      {role === "seller" && (
        <NavLink
          to={"/dashboard/receivedOrders"}
          className={({ isActive }) =>
            `flex items-center gap-2 justify-center sm:justify-start px-4 py-2 ${
              isActive
                ? "dark:bg-zinc-900 border-r-primary border-r-4"
                : "border-none"
            }`
          }
        >
          <Package size={"28"} />
          <span className="hidden sm:block">Received orders</span>
        </NavLink>
      )}
    </aside>
  );
};

export default Sidebar;
