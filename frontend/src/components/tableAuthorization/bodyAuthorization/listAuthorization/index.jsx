import React from "react";

const ListAuthorization = ({ permissions, setPermissions, menu }) => {
  const handlePermissionChange = (event, menuId, subMenuId, permission) => {
    const newPermissions = { ...permissions };

    if (subMenuId === null) {
      newPermissions[menuId] = {
        ...newPermissions[menuId],
        [permission]: event.target.checked,
      };
    } else {
      if (!newPermissions[menuId]) {
        newPermissions[menuId] = {};
      }
      if (!newPermissions[menuId][subMenuId]) {
        newPermissions[menuId][subMenuId] = {};
      }
      newPermissions[menuId][subMenuId][permission] = event.target.checked;
    }

    setPermissions(newPermissions);
  };

  // Fungsi `convertPermissionsToOutput` mengambil objek permissions dan mengonversinya menjadi format yang diinginkan.

  const convertPermissionsToOutput = (permissions) => {
    // Membuat objek kosong `output` yang akan menyimpan hasil konversi.
    const output = {};

    // Membuat peta permission yang akan digunakan untuk menghubungkan tipe izin dengan nilai numerik.
    const permissionMap = {
      view: 1,
      add: 2,
      update: 3,
      delete: 4,
    };

    // Iterasi melalui setiap kunci (menu) dalam objek permissions.
    for (const key in permissions) {
      if (permissions.hasOwnProperty(key)) {
        // Mengambil kunci (menu) dari objek permissions.
        const permissionKeys = Object.keys(permissions[key]);

        // Mengambil kunci submenu dari objek permissions yang memiliki nilai numerik (submenu).
        const submenuKeys = Object.keys(permissions[key]).filter(
          (submenu) => !isNaN(parseInt(submenu))
        );

        // Mengecek apakah ada izin true di antara izin-izin yang ada.
        const hasTruePermission = permissionKeys.some(
          (permission) => permissions[key][permission] === true
        );

        // Jika ada izin yang true, maka izin-izin tersebut diubah ke dalam format yang diinginkan dan disimpan dalam objek `output`.
        if (hasTruePermission) {
          const validPermissionKeys = permissionKeys.filter(
            (permission) => permissions[key][permission] === true
          );

          output[key] = validPermissionKeys.map(
            (permission) => `${key}_null_${permissionMap[permission]}`
          );
        }

        // Iterasi melalui kunci submenu dan mengonversi izin-izin submenu ke dalam format yang diinginkan jika ada izin true.
        submenuKeys.forEach((submenuKey) => {
          const submenuPermissions = Object.keys(permissions[key][submenuKey]);

          const validSubmenuPermissions = submenuPermissions.filter(
            (permission) => permissions[key][submenuKey][permission] === true
          );

          if (validSubmenuPermissions.length > 0) {
            output[key] = output[key] || [];
            output[key].push(
              ...validSubmenuPermissions.map(
                (permission) =>
                  `${key}_${submenuKey}_${permissionMap[permission]}`
              )
            );
          }
        });
      }
    }
    // Mengembalikan objek `output` yang berisi izin-izin dalam format yang diinginkan.
    return output;
  };

  // Menggunakan fungsi `convertPermissionsToOutput` untuk mengonversi objek `permissions` menjadi format yang diinginkan.
  const output = convertPermissionsToOutput(permissions);

  // Menampilkan hasil konversi ke konsol.
  console.log(output);

  return (
    <tbody className="capitalize">
      {menu.map((menuItem) => (
        <React.Fragment key={menuItem.id}>
          <tr className="rounded w-full">
            {menuItem.subMenuList !== null ? (
              <React.Fragment>
                <td
                  colSpan={5}
                  className="p-4 border border-y rounded-lg w-1/2 border-slate-400 "
                >
                  {menuItem.menu}
                </td>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <td className="p-4 border-l border-y rounded-l-lg w-1/2 border-slate-400 ">
                  {menuItem.menu}
                </td>
                <td className="p-4 border-y text-center border-slate-400">
                  <input
                    type="checkbox"
                    checked={
                      permissions[menuItem.id]?.view === true ? true : false
                    }
                    onChange={(e) =>
                      handlePermissionChange(e, menuItem.id, null, "view")
                    }
                  />
                </td>
                <td className="p-4 border-y text-center border-slate-400">
                  <input
                    type="checkbox"
                    checked={
                      permissions[menuItem.id]?.add === true ? true : false
                    }
                    onChange={(e) =>
                      handlePermissionChange(e, menuItem.id, null, "add")
                    }
                  />
                </td>
                <td className="p-4 border-y text-center border-slate-400">
                  <input
                    type="checkbox"
                    checked={
                      permissions[menuItem.id]?.update === true ? true : false
                    }
                    onChange={(e) =>
                      handlePermissionChange(e, menuItem.id, null, "update")
                    }
                  />
                </td>
                <td className="p-4 border-y border-r rounded-r-lg text-center border-slate-400">
                  <input
                    type="checkbox"
                    checked={
                      permissions[menuItem.id]?.delete === true ? true : false
                    }
                    onChange={(e) =>
                      handlePermissionChange(e, menuItem.id, null, "delete")
                    }
                  />
                </td>
              </React.Fragment>
            )}
          </tr>
          {menuItem.subMenuList &&
            menuItem.subMenuList.map((subMenu) => (
              <tr key={subMenu.id} className="rounded w-full">
                <td className="p-4 border-l border-y rounded-l-lg w-1/2 px-12 border-slate-400">
                  {subMenu.subMenu}
                </td>
                <td className="p-4 border-y text-center border-slate-400">
                  <input
                    type="checkbox"
                    checked={
                      permissions[menuItem.id]?.[subMenu.id]?.view === true
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      handlePermissionChange(e, menuItem.id, subMenu.id, "view")
                    }
                  />
                </td>
                <td className="p-4 border-y text-center border-slate-400">
                  <input
                    type="checkbox"
                    checked={
                      permissions[menuItem.id]?.[subMenu.id]?.add === true
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      handlePermissionChange(e, menuItem.id, subMenu.id, "add")
                    }
                  />
                </td>
                <td className="p-4 border-y text-center border-slate-400">
                  <input
                    type="checkbox"
                    checked={
                      permissions[menuItem.id]?.[subMenu.id]?.update === true
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      handlePermissionChange(
                        e,
                        menuItem.id,
                        subMenu.id,
                        "update"
                      )
                    }
                  />
                </td>
                <td className="p-4 border-y border-r rounded-r-lg text-center border-slate-400">
                  <input
                    type="checkbox"
                    checked={
                      permissions[menuItem.id]?.[subMenu.id]?.delete === true
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      handlePermissionChange(
                        e,
                        menuItem.id,
                        subMenu.id,
                        "delete"
                      )
                    }
                  />
                </td>
              </tr>
            ))}
        </React.Fragment>
      ))}
    </tbody>
  );
};

export default ListAuthorization;
