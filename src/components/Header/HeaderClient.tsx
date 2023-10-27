"use client";

import {
  Col,
  Row,
  Image,
  Container,
  InputGroup,
  Form,
  Button,
  ListGroup,
} from "react-bootstrap";
import Link from "next/link";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { SidebarOverlay } from "../Sidebar/Sidebar";
import classNames from "classnames";

export default function HeaderClient() {
  // Show status for xs screen
  const [isShowSidebar, setIsShowSidebar] = useState(false);

  // Show status for md screen and above
  const [isShowSidebarMd, setIsShowSidebarMd] = useState(true);

  const toggleIsShowSidebar = () => {
    setIsShowSidebar(!isShowSidebar);
  };

  return (
    <>
      <div className="wraphead_mobile d-sm-block d-md-block d-lg-none d-xl-none">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <div
                className="d-flex align-items-center flex-column bd-highlight mb-3"
                // style="height: 200px;"
              >
                <div className="p-2 bd-highlight">
                  <Link href="/">
                    <Image src="/test/logo_mobi.png" rounded />
                  </Link>
                </div>
                {/* <div className="p-2 bd-highlight"></div> */}
                <div className="mt-auto p-2 bd-highlight w-100">
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Tìm kiếm sản phẩm"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Text id="basic-addon2">
                      <FontAwesomeIcon size="lg" icon={faSearch} />
                    </InputGroup.Text>
                  </InputGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="menubutton d-block d-lg-none d-xl-none">
        <Button
          variant="link"
          className="header-toggler px-md-0 me-md-3 rounded-0 shadow-none"
          type="button"
          onClick={toggleIsShowSidebar}
        >
          <FontAwesomeIcon color="white" size="xl" icon={faBars} />
        </Button>
      </span>
      <div
        className={classNames("wrapmenu_right", {
          "d-flex": isShowSidebar,
        })}
        id="sidebar"
      >
        <ListGroup className="w-100">
          <ListGroup.Item>
            <Link className="link" href="/">
              Trang chủ
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link className="link" href="/">
              Thực đơn
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link className="link" href="/">
              Tuyển dụng
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link className="link" href="/">
              Về chúng tôi
            </Link>
          </ListGroup.Item>
        </ListGroup>
      </div>
      <SidebarOverlay
        isShowSidebar={isShowSidebar}
        toggleSidebar={toggleIsShowSidebar}
      />
    </>
  );
}
