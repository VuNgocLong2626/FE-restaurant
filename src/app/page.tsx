export default function Home() {
  // if (session) session.user.accessToken = "dddd";

  return (
    <div>
      <p>Hi, You Are Watching Sakura Dev Channel.</p>
      {/* <iframe src="Menu.pdf#zoom=200" width="800" height="500" /> */}
      {/* <div className="row">
        <iframe
          className="col-lg-12 col-md-12 col-sm-12"
          src="Menu.pdf"
        ></iframe>
      </div> */}
      <div className="d-lg-none">
        Điện Thoại
        <iframe src="Menu.pdf#zoom=150" width="100%" height="300" />
      </div>

      <div className="d-none d-lg-block">
        Máy tính
        <iframe src="Menu.pdf#zoom=230" width="70%" height="900" />
        ádasd
      </div>
    </div>
  );
}
