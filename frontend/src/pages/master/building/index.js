import Layout from "@/components/layout";
import Table from "@/components/table";
import React from "react";

export default function Building() {
  const data = [
    {
      building_id: "B001",
      name: "Gedung",
      floor: 5,
      tall: 10,
      long: 20,
      wide: 10,
    },
    {
      building_id: "B002",
      name: "Gedung A",
      floor: 5,
      tall: 10,
      long: 20,
      wide: 10,
    },
    {
      building_id: "B003",
      name: "Gedung B",
      floor: 5,
      tall: 10,
      long: 20,
      wide: 10,
    },
    {
      building_id: "B004",
      name: "Gedung C",
      floor: 5,
      tall: 10,
      long: 20,
      wide: 10,
    },
    {
      building_id: "B005",
      name: "Gedung C",
      floor: 5,
      tall: 10,
      long: 20,
      wide: 10,
    },
  ];
  return (
    <Layout>
      <Table
        title="Building List"
        data={data}
        buttonAdd
        search
        list={[
          {label:'Semua', value: ""},
          {label:'Aktif', value: 1},
          {label:'Tidak Aktif', value: 0},
        ]}
        actionEdit
        actionDelete
      />
    </Layout>
  );
}
