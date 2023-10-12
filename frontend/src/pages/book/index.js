import Label from "@/components/label";
import Layout from "@/components/layout";
import React from "react";

export default function Gallery() {
  return (
    <Layout>
      <div>
        <Label label="Book" type="title" />
        <div className="gap-2"></div>
      </div>
    </Layout>
  );
}
