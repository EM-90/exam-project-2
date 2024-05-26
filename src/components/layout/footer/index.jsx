import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

function Footer() {
  return (
    <footer className="pl-2 w-full flex justify-center items-center h-40 bg-skin-infoBg">
      <div className="container flex justify-between items-center flex-wrap">
        <nav className="soMe-container flex flex-col justify-center gap-2">
          <div className="flex gap-2">
            <FaInstagram className="h-8 w-8" aria-label="Instagram" />
            <FaFacebook className="h-8 w-8" aria-label="Facebook" />
            <FaTiktok className="h-8 w-8" aria-label="Tiktok" />
          </div>
          <address className="contact-info not-italic">
            <p>Holidaze.support@travel.com</p>
          </address>
        </nav>
        <div className="copy-right">
          <p>&copy; Holidaze</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
