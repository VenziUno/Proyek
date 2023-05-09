import { useState } from "react";
import {
  RiArticleLine,
  RiDashboardLine,
  RiFolderKeyholeFill,
} from "react-icons/ri";

export const useMenuProvider = () => {
  const configMenu = {
    mainMenu: [
      {
        id: 1,
        route: "/dashboard",
        name: "Dashboard",
        title: "Dashboard",
        detail: "Hello !",
        icon: <RiDashboardLine />,
      },
      {
        route: "/master",
        name: "Master Data",
        title: "Master Data",
        icon: <RiArticleLine />,
        subMenu: [
          {
            id: 15,
            route: "/master/building",
            name: "Building",
            title: "Building",
            detail: "See building details here!",
          },
          {
            id: 16,
            route: "/master/room",
            name: "Room",
            title: "Room",
            detail: "See room details here!",
          },
        ],
      },
    ],
    additionalMenu: [
      {
        route: "/profile",
        name: "Profile",
        title: "Your Profile",
        detail: "Update your photo and details here!",
      },
      {
        route: "/resetPassword",
        name: "Password",
        title: "Change Password",
        detail: "Update your Password here!",
      },
    ],
  };

  const [selectedMenu, setSelectedMenu] = useState("/dashboard");
  const [selectedSubmenu, setSelectedSubmenu] = useState("");
  const [selectedActionmenu, setSelectedActionmenu] = useState("");

  let header;
  const findSelectedMenuInMain = configMenu.mainMenu.find(
    (i) => selectedMenu  === i.route
  );
  if (findSelectedMenuInMain) {
    header = {
      title: findSelectedMenuInMain.title,
      detail: findSelectedMenuInMain.detail,
    };
    if (selectedSubmenu && findSelectedMenuInMain.subMenu) {
      const findSelectedSubmenuInMain = findSelectedMenuInMain.subMenu.find(
        (i) => selectedSubmenu === i.route
      );
      if (findSelectedSubmenuInMain) {
        header = {
          title: findSelectedSubmenuInMain.title,
          detail: findSelectedSubmenuInMain.detail,
        };
      }
      if (selectedActionmenu && findSelectedSubmenuInMain.actionMenu) {
        const findSelectedActionmenuInSub =
          findSelectedSubmenuInMain.actionMenu.find(
            (i) => selectedActionmenu === i.route
          );
        if (findSelectedActionmenuInSub) {
          header = {
            title: findSelectedActionmenuInSub.title,
            detail: findSelectedActionmenuInSub.detail,
          };
        }
      }
    } else {
      if (selectedActionmenu && findSelectedMenuInMain.actionMenu) {
        const findSelectedActionmenuInMain =
          findSelectedMenuInMain.actionMenu.find(
            (i) => selectedActionmenu === i.route
          );
        if (findSelectedActionmenuInMain) {
          header = {
            title: findSelectedActionmenuInMain.title,
            detail: findSelectedActionmenuInMain.detail,
          };
        }
      }
    }
  } else {
    const findSelectedMenuInAdditional = configMenu.additionalMenu.find(
      (i) => selectedMenu === i.route
    );
    if (findSelectedMenuInAdditional) {
      header = {
        title: findSelectedMenuInAdditional.title,
        detail: findSelectedMenuInAdditional.detail,
      };
    }
  }

  return {
    configMenu,
    header,
    selectedMenu,
    setSelectedMenu,
    selectedSubmenu,
    setSelectedSubmenu,
    selectedActionmenu,
    setSelectedActionmenu,
  };
};
