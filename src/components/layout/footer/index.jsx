import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

function Footer() {
  return (
    <div className="w-full flex justify-center items-center h-40 bg-skin-infoBg">
        <div className="container flex justify-between items-center">
            <div className="soMe-container flex flex-col justify-center gap-2">
                <div className="flex gap-2">
                    <FaInstagram size={32}/>
                    <FaFacebook size={32}/>
                    <FaTiktok size={32}/>
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
