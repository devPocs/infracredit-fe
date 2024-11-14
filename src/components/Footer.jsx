import { FaTwitter, FaFacebook, FaInstagram } from "./../icons";
import logo from "./../assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="mt-auto bg-white p-4 text-gray-600 md:p-6 lg:px-16">
      <div className="flex flex-col items-center gap-y-2 md:flex-row md:justify-between">
        <div className="flex items-center gap-x-2">
          <img className="h-8 md:h-10" src={logo} alt="company logo" />
        </div>
        <div className="flex items-center gap-x-4 text-lg md:text-xl">
          <a
            href="https://twitter.com"
            aria-label="Twitter"
            className="hover:text-blue-400"
          >
            <FaTwitter />
          </a>
          <a
            href="https://facebook.com"
            aria-label="Facebook"
            className="hover:text-blue-600"
          >
            <FaFacebook />
          </a>
          <a
            href="https://instagram.com"
            aria-label="Instagram"
            className="hover:text-pink-500"
          >
            <FaInstagram />
          </a>
          <a href="/privacy-policy" className="hover:text-mint ml-4 text-sm">
            Privacy Policy
          </a>
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-gray-500 md:text-sm">
        © {new Date().getFullYear()} InfraCredit. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
