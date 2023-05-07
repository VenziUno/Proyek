import React from "react";
import TableTopNav from "./tableTopNav";
import TableHead from "./tableHead";
import TableBody from "./tableBody";
import TableBottomNav from "./tableBottomNav";

import { useRouter } from "next/router";

const Tabel = ({
  Title,
  ButtonAdd,
  ButtonArchive,
  ButtonActive,
  ButtonPrint,
  Search,
  data,
  actionDelete,
  actionEdit,
  actionView,
  actionArchive,
  actionUnArchive,
}) => {

  let tableHead = [];
  let table_head_formatted = [];
  if (data && data.length > 0) {
    Object.keys(data[0]).forEach((key) => {
      const splitKey = key.split("_");
      const formattedKey = splitKey.join(" ");
      if (
        key !== "created_at" &&
        key !== "deleted_at" &&
        key !== "updated_at"
      ) {
        tableHead.push(key);
        table_head_formatted.push(formattedKey);
      }
    });
  }

  const location = useRouter();
  const path = location.route;
  return (
    <div className="p-4">
      <TableTopNav 
        path={path}
        Title={Title} 
        ButtonActive={ButtonActive}
        ButtonAdd={ButtonAdd}
        ButtonArchive={ButtonArchive}
        ButtonPrint={ButtonPrint}
        Search={Search}
      />
      <table className="border-separate border-spacing-y-3 w-full mb-4 border-b">
        <TableHead
          table_head_formatted={table_head_formatted}
          actionView={actionView}
          actionEdit={actionEdit}
          actionDelete={actionDelete}
          actionArchive={actionArchive}
          actionUnArchive={actionUnArchive}
        />
        <TableBody
          path={path}
          data={data}
          tableHead={tableHead}
          actionView={actionView}
          actionEdit={actionEdit}
          actionDelete={actionDelete}
          actionArchive={actionArchive}
          actionUnArchive={actionUnArchive}
        />
      </table>
      <TableBottomNav/>
    </div>
  );
};

export default Tabel;
