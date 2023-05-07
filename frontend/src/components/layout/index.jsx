import React, { useEffect, useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const session = sessionStorage.getItem("token");
    if (!session) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="w-full overflow-hidden bg-slate-100">
      <div className="flex flex-row gap-4 p-4 w-full ">
        <Sidebar />
        <div className="flex flex-col flex-grow h-full  ">
          <Header />
          <div className="w-full h-full pt-5">
            <div
              className="bg-white rounded-lg shadow-sm scrollbar-thin scrollbar-thumb-primary-500 scrollbar-thumb-rounded overflow-y-auto"
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
