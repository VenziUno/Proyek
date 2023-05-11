import Layout from "@/components/layout";
import Table from "@/components/table";
import React from "react";
import axios from "axios";

export default function Room({data}) {

  console.log(data)

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

export async function getServerSideProps() {
  try {
    // Membuat permintaan GET ke API backend
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL_SSR}/api/room`
    );
    const data = response.data;

    // Mengembalikan data yang dimuat sebagai props
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    // Menangani kesalahan saat mengirimkan permintaan
    console.error(error);

    // Mengembalikan objek kosong sebagai props jika terjadi kesalahan
    return {
      props: {},
    };
  }
}