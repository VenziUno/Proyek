import React from "react";

const TableHead = ({
  table_head_formatted,
  actionView,
  actionDelete,
  actionEdit,
  actionArchive,
  actionUnArchive,
}) => {
  return (
    <thead className="uppercase">
      <tr className="bg-gradient-to-r from-primary-50/50 to-primary-500 rounded ">
        <td className="p-4 border-l border-y rounded-l-lg w-4 text-center">
          No
        </td>
        {table_head_formatted.map((head) => (
          <td key={head} className="p-4 text-left border-y">
            {head}
          </td>
        ))}
        <td className="p-4 border-y border-r rounded-r-lg text-center">
          {(actionView ||
            actionDelete ||
            actionEdit ||
            actionArchive ||
            actionUnArchive) &&
            "Action"}
        </td>
      </tr>
    </thead>
  );
};
export default TableHead;
