import { useState } from "react";
import {
  RiDashboardFill,
  RiFolderKeyholeFill,
} from "react-icons/ri";

export const useMenuProvider = () => {
  const configMenu = {
    mainMenu: [
      {
        id: 1,
        route: "/dashboard",
        name: "Dashboard",
        title: "Hello !",
        icon: <RiDashboardFill size={20} />,
      },
      {
        route: "/data_master",
        name: "Data Master",
        title: "Data Master",
        icon: <RiFolderKeyholeFill size={18} />,
        subMenu: [
          {
            id: 13,
            route: "/data_master/identitas_sekolah",
            name: "Identitas Sekolah",
            title: "Identitas Sekolah",
            detail: "Update your photo and school details here!",
          },
          {
            id: 14,
            route: "/data_master/tahun_akademik",
            name: "Tahun Akademik",
            title: "Tahun Akademik",
            detail: "See tahun akademik details here!",
          },
          {
            id: 15,
            route: "/data_master/gedung",
            name: "Gedung",
            title: "Gedung",
            detail: "See gedung details here!",
          },
          {
            id: 16,
            route: "/data_master/ruangan",
            name: "Ruangan",
            title: "Ruangan",
            detail: "See ruangan details here!",
          },
          {
            id: 17,
            route: "/data_master/tingkatan",
            name: "Tingkatan",
            title: "Tingkatan",
          },
          {
            id: 18,
            route: "/data_master/kelas",
            name: "Kelas",
            title: "Kelas",
            detail: "See kelas details here!",
          },
          {
            id: 19,
            route: "/data_master/kalender_akademik",
            name: "Kalender Akademik",
            title: "Kalender Akademik",
            actionMenu: [
              {
                route: "/data_master/kalender_akademik/list_kegiatan",
                name: "Kegiatan",
                title: "Kegiatan",
                detail: "See Kegiatan details here!",
              },
            ],
          },
          {
            id: 20,
            route: "/data_master/jam_pembelajaran",
            name: "Jam Pembelajaran",
            title: "Jam Pembelajaran",
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