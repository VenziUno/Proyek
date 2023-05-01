import Image from "next/image";
import React, { useState } from "react";
import {
  AiOutlineDatabase,
  AiOutlineDown,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineSetting,
  AiOutlineTeam,
  AiOutlineUp,
} from "react-icons/ai";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";

const Sidebar = () => {
  const [dropDownMenu, setDropDownMenu] = useState(false);

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
            width={250}
            height={250}
          />
          <div>L O G O</div>
        </div>
        <div className="space-y-2">
          <div className="outline-none relative">
            <div className="flex items-center px-3 py-2 rounded justify-between bg-primary-300">
              <div className="flex space-x-2 items-center">
                <div>
                  <AiOutlineHome />
                </div>
                <div>Dashboard</div>
              </div>
              {/* <div>
                <AiOutlineDown></AiOutlineDown>
              </div> */}
            </div>
            {/* <div className="h-36 px-6 p2-4 w-full  bg-primary-300 ">
              <div className="flex space-x-2 items-center">
                <div>
                  <AiOutlineHome></AiOutlineHome>
                </div>
                <div>Dashboard</div>
              </div>
            </div> */}
          </div>
          <div className="outline-none ">
            <div className="flex items-center px-3 py-2 rounded justify-between bg-primary-300">
              <div className="flex space-x-2 items-center">
                <div>
                  <AiOutlineDatabase />
                </div>
                <div>Master</div>
              </div>
              <button onClick={handleShowDropDownMenu}>
                {dropDownMenu ? <AiOutlineDown /> : <AiOutlineUp />}
              </button>
            </div>
            {dropDownMenu ? (
              <div className="h-fit  w-full mt-1 bg-primary-200 rounded py-2">
                <div className="flex space-x-2 items-center px-6 py-2 hover:bg-primary-800">
                  <div>
                    <HiOutlineBuildingStorefront />
                  </div>
                  <div>Suppier</div>
                </div>
                <div className="flex space-x-2 items-center px-6 py-2 hover:bg-primary-800">
                  <div>
                    <AiOutlineTeam />
                  </div>
                  <div>Pelanggan</div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="outline-none relative">
            <div className="flex items-center px-3 py-2 rounded justify-between bg-primary-300">
              <div className="flex space-x-2 items-center">
                <div>
                  <AiOutlineSetting />
                </div>
                <div>Settings</div>
              </div>
              {/* <div>
                <AiOutlineDown></AiOutlineDown>
              </div> */}
            </div>
            {/* <div className="h-36 px-6 p2-4 w-full  bg-primary-300 ">
              <div className="flex space-x-2 items-center">
                <div>
                  <AiOutlineHome></AiOutlineHome>
                </div>
                <div>Dashboard</div>
              </div>
            </div> */}
          </div>
          <div className="outline-none relative">
            <div className="flex items-center px-3 py-2 rounded justify-between bg-primary-300">
              <div className="flex space-x-2 items-center">
                <div>
                  <AiOutlineLogout />
                </div>
                <div>Log Out</div>
              </div>
              {/* <div>
                <AiOutlineDown></AiOutlineDown>
              </div> */}
            </div>
            {/* <div className="h-36 px-6 p2-4 w-full  bg-primary-300 ">
              <div className="flex space-x-2 items-center">
                <div>
                  <AiOutlineHome></AiOutlineHome>
                </div>
                <div>Dashboard</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
