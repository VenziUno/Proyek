import React, { useState } from "react";
import Link from "next/link";
import { HiOutlineBell, HiOutlineCog } from "react-icons/hi";

const Header = () => {

    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const handleToggleProfileDropdown = () => {
        setShowProfileDropdown(!showProfileDropdown);
    };
  return (
    <div className="flex flex-row justify-between items-center bg-primary-500 shadow rounded-lg px-6 w-full h-[100px] py-auto">
      <div className="flex flex-col space-y-2">
        <div className="font-bold text-3xl">Dashboard</div>
          <div className="font-medium text-sm">Hello Pendi!!!</div>
      </div>
      <div className="flex space-x-4">
        <Link href="/settings/level" legacyBehavior>
          <a
            className=" py-4  rounded-full text-neutral-3 hover:cursor-pointer hover:text-primary-800"
          >
            <HiOutlineBell size={24} />
          </a>
        </Link>
        <Link href="/settings/level" legacyBehavior>
          <a
            className="py-4 rounded-full text-neutral-3 hover:cursor-pointer hover:text-primary-800"
          >
            <HiOutlineCog size={24} />
          </a>
        </Link>
        <div className="flex flex-col items-end relative">
          <button
            className="flex flex-row items-center gap-4"
            onClick={handleToggleProfileDropdown}
          >
            <div className="flex flex-col gap-1 justify-center items-end px-4">
              <div className="font-semibold text-sm text-neutral-4">
                {/* {user_info.name} */} Pendi
              </div>
              <div className="font-normal text-sm text-neutral-3">
                {/* {user_info.role} */} Administrator
              </div>
            </div>
              <div className="overflow-hidden relative w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-600">
                <svg
                  className="absolute -left-1 w-16 h-16 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
          </button>
          {showProfileDropdown && (
            <div
              className="absolute top-20 z-20 w-[260px] bg-white
              divide-y divide-gray-200 rounded-lg drop-shadow-xl"
              id="user-dropdown"
            > 
              <div className="py-2.5 flex flex-col cursor-default">
                <Link href="/profile" legacyBehavior>
                  <a className="px-4 py-2 text-md font-medium hover:text-primary-800">
                    Profile
                  </a>
                </Link>
                <Link href="/resetPassword" legacyBehavior>
                  <a className="px-4 py-2 text-md hover:text-primary-800">
                    Password
                  </a>
                </Link>
              </div>
              <div className="py-2.5 flex flex-col">
                <Link href="/settings" legacyBehavior>
                  <a className="px-4 py-2 text-md hover:text-primary-800">
                    Settings
                  </a>
                </Link>
                <a
                  className="px-4 py-2 text-md hover:text-primary-800 cursor-pointer"
                  onClick={(e) => handleLogOut(e)}
                >
                  Log Out
                </a>
              </div>
            </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default Header