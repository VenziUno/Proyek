import React, { useEffect, useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import { useRouter } from "next/router";
import { useAppContext } from "@/hooks/useAppContext";
import CardNotif from "../card/cardNotif";
import Notifikasi from "../notification";

const Layout = ({ children }) => {
  const router = useRouter();
  const {menu,user,basic} = useAppContext();
  const { showLogout, deleteItem } = user;
  const { setSelectedMenu, setSelectedSubmenu, setSelectedActionmenu } = menu;
  const { notification, handleShowNotification } = basic;

  useEffect(() => {
    const session = sessionStorage.getItem("token");
    if (!session) {
      router.push("/login");
    }
  }, []);

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

  useEffect(() => {
    if (notification.show) {
      handleShowNotification();
    }
  }, [handleShowNotification, notification]);

  return (
    <div className="w-full overflow-hidden">
      {notification.show && (
        <Notifikasi
          type={notification.type}
          description={notification.message}
        />
      )}
      {deleteItem.show && (
        <CardNotif
          type="delete"
          title="Are you sure you want to Delete this data?"
        />
      )}
      <div className="flex flex-row gap-4 p-4 w-full ">
        <Sidebar />
        <div className="flex flex-col flex-grow h-full  ">
          <Header />
          <div className="w-full h-full pt-5 ">
            <div
              className="bg-white rounded-lg shadow scrollbar-thin scrollbar-thumb-primary-500 scrollbar-thumb-rounded overflow-y-auto"
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
