import React, { createContext, useContext } from "react";
import { useMenuProvider } from "./providers/useMenuProvider";
import { useBasicProvider } from "./providers/useBasicProvider";
import { useUserProvider } from "./providers/useUserProvider";

const appContext = createContext();

export const AppProvider = ({ children }) => {
  const menu = useMenuProvider();
  const basic = useBasicProvider();
  const user = useUserProvider();
  return (
    <appContext.Provider
      value={{
        menu,
        basic,
        user,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(appContext);
};