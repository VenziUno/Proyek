import { useState } from "react";

export const useUserProvider = () => {
  const [userInfo, setUserInfo] = useState(
    {
      id: null,
      name: "",
      email: "",
      roles_id: "",
      school_id: null,
    }
  );
  const [showLogout, setShowLogout] = useState(false);

  const [deleteItem, setDeleteItem] = useState({
    show: false,
    url: null,
  });

  return {
    userInfo,
    setUserInfo,
    showLogout,
    setShowLogout,
    deleteItem,
    setDeleteItem,
  };
};