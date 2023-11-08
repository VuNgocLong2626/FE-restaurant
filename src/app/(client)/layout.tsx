"use client";

import HeaderClient from "../../components/Header/HeaderClient";
import HeaderMain from "@/components/Header/HeaderMain";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderMain></HeaderMain>
      <HeaderClient></HeaderClient>
      <section>{children}</section>
    </>
  );
}
