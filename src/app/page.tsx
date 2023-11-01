import MapPage from "@/components/Map";

export default function Home() {
  // if (session) session.user.accessToken = "dddd";

  return (
    <div>
      <p>Hi, You Are Watching Sakura Dev Channel.</p>
      <div className="d-lg-none">
        Điện Thoại
        <iframe src="Menu.pdf#zoom=150" width="100%" height="300" />
      </div>
      <div className="d-none d-lg-block">
        Máy tính
        <iframe src="Menu.pdf#zoom=230" width="70%" height="900" />
        ádasd
      </div>
      <MapPage></MapPage>
    </div>
  );
}
