import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAppContext } from "@/hooks/useAppContext";
import { AiOutlineDown, AiOutlineLogout, AiOutlineUp } from "react-icons/ai";
import Link from "next/link";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { useRouter } from "next/router";

const Sidebar = () => {
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const [menus, setMenus] = useState([]);

  const { menu, user } = useAppContext();
  const { configMenu, selectedMenu, selectedSubmenu, setSelectedMenu } = menu;
  const { setShowLogout } = user;
  const [showSidemenu, setShowSidemenu] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  
  useEffect(() => {
    setMenus(configMenu.mainMenu);
  });

  return (
    <div
      className="relative w-full bg-primary-500 text-black shadow flex flex-col gap-14 px-6 py-6 rounded-lg max-w-[256px]"
      style={{ height: "calc(100vh - 32px)" }}
    >
      <div className="space-y-4">
        <div className="flex text-3xl justify-center items-center space-x-4">
          <Image
            className="w-16 h-16"
            src="/logo.png"
            alt="LOGO"
            title="LOGO"
            width={250}
            height={250}
          />
          <div>LOGO</div>
        </div>
        <div className="space-y-2">
        {menus &&
          menus.map(
            ({ route, name, subMenu, icon }) => (
              <div className="flex flex-col gap-1 bg-primary-500" key={route}>
                <Link href={subMenu ? "" : route} key={route} legacyBehavior>
                  <a
                    title={showSidemenu ? "" : name}
                    className={
                      selectedMenu === route
                        ? `p-2 bg-primary-300`
                        : `p-2 hover:bg-primary-200`
                    }
                    onClick={(e) => {
                      if (!showSidemenu) {
                        setShowSidemenu(true);
                      }
                      if (route === "/logout") {
                        e.preventDefault();
                        setShowLogout(true);
                      } 
                      else if (subMenu) {
                        if (showDropdown === route) {
                          setShowDropdown(false);
                        } else {
                          setShowDropdown(route);
                        }
                      }
                    }}
                  >
                    <div className="flex flex-row justify-between items-center gap-4">
                      <div className="flex flex-row items-center">
                        <div className={showSidemenu ? "w-8" : ""}>{icon}</div>
                        {showSidemenu && name}
                      </div>
                      {subMenu &&
                        showSidemenu &&
                        (selectedMenu === route || showDropdown === route ? (
                          <HiChevronUp size={16} />
                        ) : (
                          <HiChevronDown size={16} />
                        ))}
                    </div>
                  </a>
                </Link>
                {showSidemenu &&
                  (selectedMenu === route || showDropdown === route) &&
                  subMenu && (
                    <div className="flex flex-row justify-center">
                      <div className="bg-primary-500 flex flex-col w-full">
                        {subMenu.map((sub) => (
                          <Link href={sub.route} key={sub.route} legacyBehavior>
                            <a
                              className={
                                selectedSubmenu === sub.route
                                  ? "pl-6 py-2 bg-primary-300"
                                  : "pl-6 py-2 hover:bg-primary-200"
                              }
                            >
                              {sub.name}
                            </a>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
