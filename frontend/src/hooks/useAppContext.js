import React, { createContext, useContext } from "react";
import { useMenuProvider } from "./providers/useMenuProvider";

const appContext = createContext();

export const AppProvider = ({ children }) => {
  const menu = useMenuProvider();
  return (
    <appContext.Provider
      value={{
        menu
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(appContext);
};