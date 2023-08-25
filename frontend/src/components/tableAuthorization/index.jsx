import React, { useEffect, useState } from "react";
import HeadAuthorization from "./headAuthorization";
import BodyAuthorization from "./bodyAuthorization";
import { useAppContext } from "@/hooks/useAppContext";
import { useRouter } from "next/router";
import { useFetcher } from "@/hooks/useFetcher";

const TableAuthorization = ({page}) => {
  const [permissions, setPermissions] = useState({});
  const [checkAllState, setCheckAllState] = useState(false);
  const { basic } = useAppContext();
  const { search, move, setMove, route } = basic;
  const location = useRouter();
  const { res, isLoading, isError } = useFetcher("role", page);
  const [dataTableGedung, setDataTableGedung] = useState(null);

  const list = [
    { label: "Semua", value: "" },
    { label: "Aktif", value: 1 },
    { label: "Tidak Aktif", value: 0 },
  ]

  useEffect(() => {
    if (res) {
      const data = res.data.map((gedung) => {
        const arr = Object.entries(gedung);
        const filterArr = arr.filter(
          ([key, value]) => key !== "status" && typeof value !== "object"
        );
        const newObj = Object.fromEntries(filterArr);
        return newObj;
      });
      setDataTableGedung(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res]);

  const menu = [
    { id: 1, menu: "Dashboard", subMenuList: null },
    {
      id: 2,
      menu: "Setting",
      subMenuList: [
        { id: 1, subMenu: "Role" },
        { id: 2, subMenu: "Admin" },
        { id: 3, subMenu: "Authorizatiom" },
      ],
    },
    { id: 3, menu: "Banner", subMenuList: null },
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

  return (
    <div>
      <HeadAuthorization handleCheckAll={handleCheckAll} dataTableGedung={dataTableGedung}/>
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

export async function getServerSideProps(ctx) {
  const page = ctx.query.page || 1;
  const baseUrl = `${process.env.API_URL}/api/role`;
  return { props: { page, baseUrl } };
}