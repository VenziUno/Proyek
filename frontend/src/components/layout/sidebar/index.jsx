import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAppContext } from "@/hooks/useAppContext";
import { AiOutlineDown, AiOutlineLogout, AiOutlineUp } from "react-icons/ai";
import Link from "next/link";

const Sidebar = () => {
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const [menus, setMenus] = useState([]);

  const { menu } = useAppContext();
  const { configMenu } = menu;

  useEffect(() => {
    setMenus(configMenu.mainMenu);
  });

  const handleShowDropDownMenu = () => {
    setDropDownMenu(!dropDownMenu);
  };

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
          {menus.map((menu, index) => {
            return (
              <div className="outline-none relative" key={index}>
                {menu.subMenu ? (
                  <button
                    onClick={handleShowDropDownMenu}
                    className="w-full px-3 py-2 rounded  bg-primary-300"
                  >
                    <div className="flex items-center rounded justify-between">
                      <div className="flex space-x-2 items-center">
                        <div>{menu.icon}</div>
                        <div>{menu.name}</div>
                      </div>
                      {dropDownMenu ? <AiOutlineDown /> : <AiOutlineUp />}
                    </div>
                  </button>
                ) : (
                  <Link href={menu.route}>
                    <div className="flex items-center px-3 py-2 rounded justify-between bg-primary-300">
                      <div className="flex space-x-2 items-center">
                        <div>{menu.icon}</div>
                        <div>{menu.name}</div>
                      </div>
                    </div>
                  </Link>
                )}
                {menu.subMenu && dropDownMenu && (
                  <div className="h-fit  w-full mt-1 bg-primary-200 rounded py-2">
                    {menu.subMenu.map((submenu, index) => {
                      return (
                        <Link href={submenu.route} key={index}>
                          <div className="flex space-x-2 items-center px-9 py-2 hover:bg-primary-300">
                            <div>{submenu.name}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          <div className="outline-none relative">
            <div className="flex items-center px-3 py-2 rounded justify-between bg-primary-300">
              <div className="flex space-x-2 items-center">
                <div>
                  <AiOutlineLogout />
                </div>
                <div>Log Out</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
