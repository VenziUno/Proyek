import React, { useEffect, useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import { useRouter } from 'next/router';

const Layout = ({ children }) => {

  const router = useRouter();

  useEffect(() => {
    const session = sessionStorage.getItem('token');
    if (!session) {
      router.push('/login');
    }
  }, []);

  return (
    <div className="w-full ">
      <div className="flex flex-row gap-4 p-4 w-full bg-black">
        <Sidebar />
        <div className="flex flex-col flex-grow h-full ">
          <Header />
          <div className="w-full h-full pt-5">
            <div    
                className="w-full bg-white shadow-md h-screen rounded-lg p-6"
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
