import Button from "@/components/button";
import InputFields from "@/components/inputFields";
import React from "react";

const TableTopNav = ({
  path,
  Title,
  ButtonAdd,
  ButtonArchive,
  ButtonActive,
  ButtonPrint,
  Search,
}) => {
  return (
    <div className="px-4 py-4 font-semibold border-b text-3xl flex justify-between items-center ">
      <div>{Title || ""}</div>
      <div className="flex flex-row items-center gap-2">
        {Search && <InputFields icon="search"></InputFields>}
        {ButtonAdd && <Button action='info' link={path + "/add"}>Add</Button>}
        {ButtonActive && <Button link={path + "/archive"}>Archive</Button>}
        {ButtonArchive && <Button link={path + "/unarchive"}>Active</Button>}
        {ButtonPrint && <Button link={path + "/print"}>Print</Button>}
      </div>
    </div>
  );
};

export default TableTopNav;
