import React, { useEffect, useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import { useRouter } from "next/router";
import { useAppContext } from "@/hooks/useAppContext";

const Layout = ({ children }) => {
  const router = useRouter();
  const {menu} = useAppContext();

  useEffect(() => {
    const session = sessionStorage.getItem("token");
    if (!session) {
      router.push("/login");
    }
  }, []);

  const { setSelectedMenu, setSelectedSubmenu, setSelectedActionmenu } = menu;
  const path = router.route;
  const pathMenu = "/" + path.split("/")[1];
  const pathSubMenu = "/" + path.split("/")[2];
  const pathAction = "/" + path.split("/")[3];

  useEffect(() => {
    setSelectedMenu(pathMenu);
    setSelectedSubmenu("");
    setSelectedActionmenu("");
    if (pathSubMenu === "/undefined") {
      setSelectedSubmenu("");
    } else if (
      pathSubMenu === "/add" ||
      pathSubMenu === "/edit" ||
      pathSubMenu === "/archive" ||
      pathSubMenu === "/detail"
    ) {
      setSelectedActionmenu(pathMenu + pathSubMenu);
    } else {
      setSelectedSubmenu(pathMenu + pathSubMenu);
      if (pathAction === "/undefined") {
        setSelectedActionmenu("");
      } else {
        setSelectedActionmenu(pathMenu + pathSubMenu + pathAction);
      }
    }
  }, [
    pathAction,
    pathMenu,
    pathSubMenu,
    setSelectedActionmenu,
    setSelectedMenu,
    setSelectedSubmenu,
  ]);

  return (
    <div className="w-full overflow-hidden bg-slate-100">
      <div className="flex flex-row gap-4 p-4 w-full ">
        <Sidebar />
        <div className="flex flex-col flex-grow h-full  ">
          <Header />
          <div className="w-full h-full pt-5 ">
            <div
              className="bg-blue-200 rounded-lg shadow-sm scrollbar-thin scrollbar-thumb-primary-500 scrollbar-thumb-rounded overflow-y-auto"
              style={{ height: "calc(100vh - 152px)" }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
