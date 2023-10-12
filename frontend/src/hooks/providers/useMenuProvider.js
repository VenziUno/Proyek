import { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { RiArticleLine, RiDashboardLine } from "react-icons/ri";

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
        id: 2,
        route: "/banner",
        name: "Banner",
        title: "Banner",
        detail: "Banner Details",
        icon: <RiDashboardLine />,
      },
      {
        id: 3,
        route: "/book",
        name: "Book",
        title: "Book",
        detail: "Book Details",
        icon: <RiDashboardLine />,
      },
      {
        id: 4,
        route: "/member",
        name: "Member",
        title: "Member",
        detail: "Member Details",
        icon: <RiDashboardLine />,
      },
      {
        id: 5,
        route: "/transaction",
        name: "Transaction",
        title: "Transaction",
        icon: <RiDashboardLine />,
        subMenu: [
          {
            id: 10,
            route: "/transaction/borrowing",
            name: "Borrowing",
            title: "Borrowing",
            detail: "See borrowing details here!",
          },
          {
            id: 11,
            route: "/transaction/reversion",
            name: "Reversion",
            title: "Reversion",
            detail: "See reversion details here!",
          },
        ],
      },
      {
        id: 7,
        route: "/settings",
        name: "Setting",
        title: "Setting",
        icon: <RiDashboardLine />,
        subMenu: [
          {
            id: 12,
            route: "/settings/account",
            name: "Account",
            title: "Account Details",
            detail: "See Account details here!",
          },
          {
            id: 13,
            route: "/settings/role",
            name: "Role",
            title: "Role Details",
            detail: "See Role details here!",
          },
          {
            id: 14,
            route: "/settings/authorization",
            name: "Authorization",
            title: "Authorization Details",
            detail: "See Authorization details here!",
          },
          // {
          //   id: 14,
          //   route: "/settings/activity",
          //   name: "Activity Log",
          //   title: "Activity Log Details",
          //   detail: "See Authorization details here!",
          // },
        ],
      },
      {
        id: 8,
        route: "/logout",
        name: "Logout",
        title: "Logout",
        detail: "Logout",
        icon: <AiOutlineLogout />,
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
        route: "/password",
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
    (i) => selectedMenu === i.route
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
