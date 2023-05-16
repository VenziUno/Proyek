import React, { createContext, useContext } from "react";
import { useMenuProvider } from "./providers/useMenuProvider";
import { useBasicProvider } from "./providers/useBasicProvider";
import { useUserProvider } from "./providers/useUserProvider";
import { useBuildingProvider } from "./providers/master/useBuildingProvider";
import { useRoomProvider } from "./providers/master/useRoomProvider";

const appContext = createContext();

export const AppProvider = ({ children }) => {
  const menu = useMenuProvider();
  const basic = useBasicProvider();
  const user = useUserProvider();
  
  // Master
  const building = useBuildingProvider();
  const room = useRoomProvider();

  return (
    <appContext.Provider
      value={{
        menu,
        basic,
        user,
        building,
        room,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(appContext);
};