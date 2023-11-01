import { Col, Container, Row, Image } from "react-bootstrap";
import Link from "next/link";

export default function HeaderMain() {
  // if (session) session.user.accessToken = "dddd";

  return (
    <>
      <div className="d-none d-lg-block">
        <div className="topbar">
          <Container>
            <Row>
              <div className="col-xl-6 col-lg-6 d-lg-block col-md-none d-sm-none">
                <div className="time_contact">
                  <p>
                    {/* <i><Image src="images/i_phone.png" alt="Template Tea House"></i> */}
                    Hotline:{" "}
                    <a className="fone" href="tel:19006750">
                      1900 6750
                    </a>
                  </p>
                </div>
              </div>
            </Row>
          </Container>
        </div>
        <Container className="h-125 d-flex justify-content-center align-items-center ">
          <Row>
            <div className="col-xl-12 col-lg-12 d-flex ">
              <div className="d-flex justify-content-center align-items-center link">
                <Link className="link header-link " href="/dashboard">
                  Trang chủ
                </Link>
                <Link className="link header-link m-20" href="/">
                  Về chúng tôi
                </Link>
              </div>
              <div className="d-flex align-items-center">
                <Image
                  alt="Preview"
                  className="w-200"
                  src="/test/logo.png"
                  rounded
                />
              </div>
              <div className="d-flex justify-content-center align-items-center link">
                <Link className="link header-link m-20" href="/">
                  Thực đơn
                </Link>
                <Link className="link header-link " href="/">
                  Tuyển dụng
                </Link>
              </div>

              {/* <Col xs lg="2">
                <Link href="/">Trang chủ</Link>
                <Link href="/">Về chúng tôi</Link>
              </Col>
              <Col md="auto">
                <Image src="/test/logo.png" rounded />
              </Col>
              <Col xs lg="2">
                <Link href="/">Trang chủ</Link>
                <Link href="/">Về chúng tôi</Link>
              </Col> */}
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
}
