import Button from "@/components/button";
import React from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { useRouter } from "next/router";
import { useAppContext } from "@/hooks/useAppContext";
import Image from "next/image";

const TableBody = ({
  path,
  data,
  tableHead,
  actionView,
  actionDelete,
  actionEdit,
}) => {
  const location = useRouter();
  const { user } = useAppContext();
  const { setDeleteItem } = user;

  const handleDelete = (item) => {
    const baseUrl = location.components[path].props.pageProps.baseUrl;
    const url = `${baseUrl}/${item.id}`;
    setDeleteItem({ show: true, url: url, data: data.length });
  };

  return (
    <tbody>
      {data.map((item, index) => {
        return (
          <tr className="border rounded" key={index}>
            <td className="p-4 border-y border-l rounded-l-lg text-center border-slate-400">
              {index + 1}
            </td>
            {tableHead.map((head) => (
              <td
                key={"item" + head + index}
                className="p-4 border-y border-slate-400"
              >
                {head === "file" ? (
                  <div className="relative">
                    <Image
                      src={item[head]}
                      alt="Picture of the author"
                      width={500}
                      height={500}
                      className="object-contain w-10 h-10  border border-black"
                    />
                  </div>
                ) : (
                  <React.Fragment>
                    {item[head].length > 45 ? (
                      <div title={item[head]}>{item[head].slice(0, 50)}...</div>
                    ) : (
                      <React.Fragment>{item[head]}</React.Fragment>
                    )}
                  </React.Fragment>
                )}
              </td>
            ))}
            <td className="border-y border-r rounded-r-lg px-2 border-slate-400">
              <div className="flex gap-2 justify-center">
                {actionView && (
                  <Button link={path + "/detail"} action="info">
                    <AiOutlineEye />
                  </Button>
                )}
                {actionEdit && (
                  <Button link={path + "/edit/" + item.id} action="warning">
                    <AiOutlineEdit />
                  </Button>
                )}
                {actionDelete && (
                  <Button
                    action="danger"
                    handleClick={() => handleDelete(item)}
                    link={location.asPath}
                  >
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
