import Button from "@/components/button";
import InputFields from "@/components/inputFields";
import Selects from "@/components/selects";
import React from "react";

const TableTopNav = ({ path, title, buttonAdd, buttonPrint, search, list }) => {
  return (
    <div className="py-2 space-y-2 mb-3 ">
      <div>
        <div className="flex justify-between items-center ">
          <div className="flex flex-row items-center gap-2">
            {search && <InputFields icon="search"></InputFields>}
            {list && <Selects list={list} size="w-full" placeholder="Status" />}
          </div>
          <div className="flex flex-row items-center gap-2">
          {buttonAdd && (
              <Button action="info" link={path + "/add"}>
                Create
              </Button>
            )}
            {buttonPrint && <Button link={path + "/print"}>Print</Button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableTopNav;
