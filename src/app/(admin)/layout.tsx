"use client";

import { signOut } from "next-auth/react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useCallback, useEffect, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import Header from "@/components/Header/Header";
import styles from "./admin.module.css";
import classNames from "classnames";
import { Sidebar, SidebarOverlay } from "@/components/Sidebar/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Show status for xs screen
  const [isShowSidebar, setIsShowSidebar] = useState(false);

  // Show status for md screen and above
  const [isShowSidebarMd, setIsShowSidebarMd] = useState(true);

  const toggleIsShowSidebar = () => {
    setIsShowSidebar(!isShowSidebar);
  };

  const toggleIsShowSidebarMd = () => {
    const newValue = !isShowSidebarMd;
    localStorage.setItem("isShowSidebarMd", newValue ? "true" : "false");
    setIsShowSidebarMd(newValue);
  };

  // Clear and reset sidebar
  const resetIsShowSidebar = () => {
    setIsShowSidebar(false);
  };

  const onResize = useCallback(() => {
    resetIsShowSidebar();
  }, []);

  const { ref } = useResizeDetector({ onResize });

  // On first time load only
  useEffect(() => {
    if (localStorage.getItem("isShowSidebarMd")) {
      setIsShowSidebarMd(localStorage.getItem("isShowSidebarMd") === "true");
    }
  }, [setIsShowSidebarMd]);

  return (
    <>
      <div ref={ref} className="position-absolute w-100" />
      <Sidebar isShow={isShowSidebar} isShowMd={isShowSidebarMd} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Header
          toggleSidebar={toggleIsShowSidebar}
          toggleSidebarMd={toggleIsShowSidebarMd}
        />
        <div className="body flex-grow-1 px-sm-2 mb-4">
          <Container fluid="lg">{children}</Container>
        </div>
        {/* <Footer /> */}
      </div>
      <SidebarOverlay
        isShowSidebar={isShowSidebar}
        toggleSidebar={toggleIsShowSidebar}
      />
    </>
  );
}
