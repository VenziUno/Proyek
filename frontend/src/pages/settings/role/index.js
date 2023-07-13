import Layout from "@/components/layout";
import Table from "@/components/table";
import React, { useEffect, useState } from "react";
import { useAppContext } from "@/hooks/useAppContext";
import { useFetcher } from "@/hooks/useFetcher";
import { useRouter } from "next/router";

export default function Role ({ page }) {
  const { basic } = useAppContext();
  const { search, move, setMove, route } = basic;
  const location = useRouter();
  const { res, isLoading, isError } = useFetcher("role", page);
  const [dataTableGedung, setDataTableGedung] = useState([]);
  const [dataPagination, setDataPagination] = useState({
    from: "",
    to: "",
    total: "",
    current_page: "",
    last_page: "",
  });

  const list = [
    { label: "Semua", value: "" },
    { label: "Aktif", value: 1 },
    { label: "Tidak Aktif", value: 0 },
  ]

  useEffect(() => {
    if (res) {
      const data = res.data.map((gedung) => {
        const arr = Object.entries(gedung);
        // const filterArr = arr.filter(
        //   ([key, value]) => key !== "status" && typeof value !== "object"
        // );
        const newObj = Object.fromEntries(arr);
        return newObj;
      });
      setDataTableGedung(data);
      setDataPagination({
        ...dataPagination,
        from: res.from,
        to: res.to,
        total: res.total,
        current_page: res.current_page,
        last_page: res.last_page,
      });
      if (search && move) {
        setMove(false);
        location.push(`${route}?page=1`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res]);

  return (
    <Layout>
      <Table
        title="Building List"
        data={dataTableGedung}
        pagination={dataPagination}
        buttonAdd
        search
        actionEdit
        actionDelete
      />
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const page = ctx.query.page || 1;
  const baseUrl = `${process.env.API_URL}/api/role`;
  return { props: { page, baseUrl } };
}
