import Button from "@/components/button";
import React from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
const TableBody = ({
  path,
  data,
  tableHead,
  actionView,
  actionDelete,
  actionEdit,
}) => {
  return (
    <tbody>
      {data.map((item, index) => {
        return (
          <tr className="border rounded" key={index}>
            <td className="p-4 border-y border-l rounded-l-lg text-center">
              {index + 1}
            </td>
            {tableHead.map((head) => (
              <td key={"item" + head + index} className="p-4 border-y">
                {item[head]}
              </td>
            ))}
            <td className="border-y border-r rounded-r-lg px-2">
              <div className="flex gap-2 justify-center">
                {actionView && (
                  <Button link={path + "/detail"} action="info">
                    <AiOutlineEye />
                  </Button>
                )}
                {actionEdit && (
                  <Button link={path + "/edit/"} action="warning">
                    <AiOutlineEdit />
                  </Button>
                )}
                {actionDelete && (
                  <Button action="danger">
                    <AiOutlineDelete />
                  </Button>
                )}
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
