import Layout from "@/components/layout";
import Table from "@/components/table";
import React, { useEffect, useState } from "react";
import { useAppContext } from "@/hooks/useAppContext";
import { useFetcher } from "@/hooks/useFetcher";
import { useRouter } from "next/router";

const Room = ({ page }) => {
  const { basic } = useAppContext();
  const { search, move, setMove, route } = basic;
  const location = useRouter();
  const { res, isLoading, isError } = useFetcher("room", page);
  const [dataTableRoom, setDataTableRoom] = useState([]);
  const [dataPagination, setDataPagination] = useState({
    from: "",
    to: "",
    total: "",
    current_page: "",
    last_page: "",
  });

  useEffect(() => {
    if (res) {
      console.log(res)
      const data = res.data.map((room) => {
        const arr = Object.entries(room);
        const filterArr = arr.filter(
          ([key, value]) => key !== "status" && typeof value !== "object"
        );
        const newObj = Object.fromEntries(filterArr);
        return newObj;
      });
      setDataTableRoom(data);
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
        title="Room List"
        data={dataTableRoom}
        pagination={dataPagination}
        buttonAdd
        search
        list={[
          { label: "Semua", value: "" },
          { label: "Aktif", value: 1 },
          { label: "Tidak Aktif", value: 0 },
        ]}
        actionEdit
        actionDelete
      />
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const page = ctx.query.page || 1;
  const baseUrl = `${process.env.API_URL}/api/room`;
  return { props: { page, baseUrl } };
}

export default Room;
