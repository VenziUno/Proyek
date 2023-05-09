import React from "react";
import TableTopNav from "./tableTopNav";
import TableHead from "./tableHead";
import TableBody from "./tableBody";
import TableBottomNav from "./tableBottomNav";
import { useRouter } from "next/router";

const Tabel = ({
  title,
  buttonAdd,
  buttonPrint,
  search,
  list,
  data,
  actionDelete,
  actionEdit,
  actionView,
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
    <div className="p-4 h-full">
      <TableTopNav 
        path={path}
        title={title} 
        buttonAdd={buttonAdd}
        buttonPrint={buttonPrint}
        search={search}
        list={list}
      />
      <table className="border-separate border-spacing-y-3 ">
        <TableHead
          table_head_formatted={table_head_formatted}
          actionView={actionView}
          actionEdit={actionEdit}
          actionDelete={actionDelete}
        />
        <TableBody
          path={path}
          data={data}
          tableHead={tableHead}
          actionView={actionView}
          actionEdit={actionEdit}
          actionDelete={actionDelete}
        />
      </table>
      <TableBottomNav />
    </div>
  );
};

export default Tabel;
