import { socialImgs } from "../constants";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center">
          <p>Terms & Conditions</p>
        </div>
        <div className="socials flex-wrap">
          {socialImgs.map((socialImg, index) => (
            <a
              key={index}
              href={socialImg.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={socialImg.name}
              className="icon"
            >
              <img src={socialImg.imgPath} alt={socialImg.name} className="size-5 object-contain" />
            </a>
          ))}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-center md:text-end">
            © {new Date().getFullYear()} Lourence Anotida Ruhwaya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
