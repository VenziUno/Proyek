import React, { useState } from "react";
import HeadAuthorization from "./headAuthorization";
import BodyAuthorization from "./bodyAuthorization";

const TableAuthorization = () => {
  const [permissions, setPermissions] = useState({});
  const [checkAllState, setCheckAllState] = useState(false);

  const menu = [
    { id: 1, menu: "Dashboard", subMenuList: null },
    {
      id: 2,
      menu: "Setting",
      subMenuList: [
        { id: 1, subMenu: "role" },
        { id: 2, subMenu: "admin" },
      ],
    },
  ];

  const handleCheckAll = () => {
    const newPermissions = { ...permissions };
    const newCheckAllState = !checkAllState; // Toggle checkAllState

    for (const menuItem of menu) {
      if (menuItem.subMenuList) {
        for (const subMenu of menuItem.subMenuList) {
          if (!newPermissions[menuItem.id]) {
            newPermissions[menuItem.id] = {};
          }
          if (!newPermissions[menuItem.id][subMenu.id]) {
            newPermissions[menuItem.id][subMenu.id] = {};
          }

          newPermissions[menuItem.id][subMenu.id] = {
            view: newCheckAllState,
            add: newCheckAllState,
            update: newCheckAllState,
            delete: newCheckAllState,
          };
        }
      } else {
        newPermissions[menuItem.id] = {
          view: newCheckAllState,
          add: newCheckAllState,
          update: newCheckAllState,
          delete: newCheckAllState,
        };
      }
    }

    setPermissions(newPermissions);
    setCheckAllState(newCheckAllState); // Update checkAllState
  };

  console.log(permissions)

  return (
    <div>
      <HeadAuthorization handleCheckAll={handleCheckAll} />
      <BodyAuthorization
        permissions={permissions}
        setPermissions={setPermissions}
        checkAllState={checkAllState}
        setCheckAllState={setCheckAllState}
        menu={menu}
      />
    </div>
  );
};

export default TableAuthorization;
