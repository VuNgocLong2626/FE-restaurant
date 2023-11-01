"use client";

import { signIn } from "next-auth/react";
import React, { useRef, useState } from "react";
import { Button, Form, Row, Image, Col, InputGroup } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import styles from "./styles.module.css";
import "./styles.module.css";
import Container from "react-bootstrap/Container";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  const register = async (e: any) => {
    e.preventDefault();
    console.log("sadsasdaasdsad");
    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    // const { token } = result;
    if (result?.status === 401) {
      toast.error("Credentials do not match!");
      return;
    }
    // console.log(result);
    router.push("/Admin");
  };

  const clickHandler = () => {
    setShowPass(!showPass);
  };
  return (
    <>
      <Container className={styles.content}>
        <Row>
          <div className="col-md-6 .d-md-block">
            <Image alt="Preview" className="img-fluid" src="/login.svg" />
          </div>
          <div className="col-md-6 contents d-flex justify-content-center align-items-center">
            <Row className="justify-content-center">
              <Col md={8}>
                <div className="mb-4">
                  <h3>Đăng nhập</h3>
                  <p className="mb-4">
                    Vào trang quản lý để sửa những thông tin về trang web như là
                    món ăn, thực đơn...
                  </p>
                </div>
                <Form onSubmit={register}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Tài khoản</Form.Label>
                    <Form.Control
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="tài khoản là 1 email"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="nhập mật khẩu"
                    />
                  </Form.Group>

                  <Button
                    className={styles.btn_login}
                    variant="primary"
                    type="submit"
                  >
                    Đăng nhập
                  </Button>
                </Form>
                <ToastContainer />
              </Col>
            </Row>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
