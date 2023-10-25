import { Button, Container } from "react-bootstrap";
import Link from "next/link";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
type HeaderProps = {
  toggleSidebar: () => void;
  toggleSidebarMd: () => void;
};

export default function Header(props: HeaderProps) {
  const { toggleSidebar, toggleSidebarMd } = props;
  const { data: session } = useSession();
  return (
    <header className="header sticky-top mb-4 py-2 px-sm-2 border-bottom">
      <Container fluid className="header-navbar d-flex align-items-center">
        <Button
          variant="link"
          className="header-toggler d-md-none px-md-0 me-md-3 rounded-0 shadow-none"
          type="button"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon size="lg" icon={faBars} />
        </Button>
        <Button
          variant="link"
          className="header-toggler d-none d-md-inline-block px-md-0 me-md-3 rounded-0 shadow-none"
          type="button"
          onClick={toggleSidebarMd}
        >
          <FontAwesomeIcon size="lg" icon={faBars} />
        </Button>
        <Link href="/" className="header-brand d-md-none">
          <svg width="80" height="46">
            <title>CoreUI ddddddddd</title>
            <use xlinkHref="/assets/brand/coreui.svg#full" />
          </svg>
        </Link>
        <div className="header-nav d-none d-md-flex">
          {/* <HeaderFeaturedNav /> */}
        </div>
        <div className="header-nav ms-auto">
          {/* <HeaderNotificationNav /> */} {session?.user?.email}
        </div>
        <div className="header-nav ms-2">{/* <HeaderProfileNav /> */}</div>
      </Container>
    </header>
  );
}
