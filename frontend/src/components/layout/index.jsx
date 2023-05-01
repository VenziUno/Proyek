import React from "react";
import Header from "./header";
import Sidebar from "./sidebar";

const Layout = ({ children }) => {
  return (
    <div className="w-full ">
      <div className="flex flex-row gap-4 p-4 w-full">
        <Sidebar />
        <div className="flex flex-col flex-grow h-full ">
          <Header />
          <div className="w-full h-full pt-5">
            <div    
                className="w-full bg-white shadow h-screen rounded-lg p-6"
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
