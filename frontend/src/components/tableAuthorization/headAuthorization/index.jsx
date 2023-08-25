import React, { useEffect, useState } from "react";
import Selects from "@/components/selects";
import Button from "@/components/button";

const HeadAuthorization = ({ handleCheckAll, dataTableGedung }) => {
  const [selectOptions, setSelectOptions] = useState([]);

  useEffect(() => {
    if (dataTableGedung) {
      const options = dataTableGedung.map((item) => ({
        label: item.name,
        value: item.id
      }));
      setSelectOptions(options);
    }
  }, [dataTableGedung]);

  return (
    <div className="flex justify-between py-4 px-4">
      <div className="flex gap-4">
        <Selects
          list={selectOptions}
          placeholder={"Master Administrator"}
          size={"w-60"}
        />
        <Button>Update</Button>
      </div>
      <div className="flex font-semibold text-xl justify-center items-center gap-4">
        <Button handleClick={() => handleCheckAll()}>Tandai Semua</Button>
      </div>
    </div>
  );
};

export default HeadAuthorization;