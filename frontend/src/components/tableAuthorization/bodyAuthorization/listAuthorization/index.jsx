import React from "react";

const ListAuthorization = () => {
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

  return (
    <tbody className="capitalize ">
      {menu.map((menuItem) => (
        <React.Fragment key={menuItem.id}>
          <tr className="rounded w-full">
            <td className="p-4 border-l border-y rounded-l-lg w-1/2 border-slate-400">
              {menuItem.menu}
            </td>
            <td className="p-4 border-y text-center border-slate-400">
              {menuItem.subMenuList !== null ? null : (
                <input type="checkbox" id="lihat" />
              )}
            </td>
            <td className="p-4 border-y text-center border-slate-400">
              {menuItem.subMenuList !== null ? null : (
                <input type="checkbox" id="add" />
              )}
            </td>
            <td className="p-4 border-y text-center border-slate-400">
              {menuItem.subMenuList !== null ? null : (
                <input type="checkbox" id="update" />
              )}
            </td>
            <td className="p-4 border-y border-r rounded-r-lg text-center border-slate-400">
              {menuItem.subMenuList !== null ? null : (
                <input type="checkbox" id="delete" />
              )}
            </td>
          </tr>

          {menuItem.subMenuList &&
            menuItem.subMenuList.map((subMenu) => (
              <tr key={subMenu.id} className="rounded w-full">
                <td className="p-4 border-l border-y rounded-l-lg w-1/2 px-12 border-slate-400">
                  {subMenu.subMenu}
                </td>
                <td className="p-4 border-y text-center border-slate-400">
                  <input type="checkbox" id="create" />
                </td>
                <td className="p-4 border-y text-center border-slate-400">
                  <input type="checkbox" id="add" />
                </td>
                <td className="p-4 border-y text-center border-slate-400">
                  <input type="checkbox" id="update" />
                </td>
                <td className="p-4 border-y border-r rounded-r-lg text-center border-slate-400">
                  <input type="checkbox" id="delete" />
                </td>
              </tr>
            ))}
        </React.Fragment>
      ))}
    </tbody>
  );
};

export default ListAuthorization;
