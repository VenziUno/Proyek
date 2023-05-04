import Layout from "@/components/layout";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  // const token = sessionStorage.getItem("accessToken");

  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(sessionStorage.getItem(name))
  }, [])

  console.log(value)
  return (
    <div>
      <Layout>
        Welcome
      </Layout>
    </div>
  );
}
