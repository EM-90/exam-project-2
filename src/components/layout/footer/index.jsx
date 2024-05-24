import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

function Footer() {
  return (
    <div className="pl-2 w-full flex justify-center items-center h-40 bg-skin-infoBg">
        <div className="container flex justify-between items-center flex-wrap">
            <div className="soMe-container flex flex-col justify-center gap-2">
                <div className="flex gap-2">
                    <FaInstagram className="h-8 w-8" />
                    <FaFacebook className="h-8 w-8" />
                    <FaTiktok className="h-8 w-8" />
                </div>
                <div className="contact-info">
                  <p>Holidaze.support@travel.com</p>
                </div>
            </div>
            <div className="copy-right">
             <p>&copy; Holidaze</p>
            </div>
        </div>
    </div>
  )
}

export default Footer
