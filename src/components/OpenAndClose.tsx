import { Row } from "react-bootstrap";

const OpenAndClose = () => {
  return (
    <>
      <div className="container">
        <Row>
          <div className="col-xl-7 col-lg-7 col-12 left">
            {/* d-flex flex-column justify-content-center align-items-center */}
            <div className="left_module">
              <div className="header-open">
                <h2 style={{ fontSize: "3rem" }}>Thời gian mở cửa</h2>
              </div>
              <div className="header-text">
                <p>
                  &quotCà phê nhé &quot- Một lời hẹn rất riêng của người Việt.
                  Một lời ngỏ mộc mạc để mình ngồi lại bên nhau và sẻ chia câu
                  chuyện của riêng mình.
                </p>
                <span className="time-header">T2 - T6: 8h30 - 21h30</span>
                <br></br>
                <span className="time-header">T7 - CN: 8h00 - 22h00</span>
              </div>
            </div>
          </div>
          <div
            className="col-xl-5 col-lg-5 col-12 bg_right d-none d-lg-block"
            style={{ marginTop: "15px", marginLeft: "-15px" }}
          ></div>
        </Row>
      </div>
    </>
  );
};

export default OpenAndClose;
