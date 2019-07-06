import React from "react";
import { SocialIcon } from "react-social-icons";
const Footer = () => {
  return (
    <footer className="page-footer pink">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Follow Us on Social Media!</h5>
            <SocialIcon
              className="si"
              network="linkedin"
              bgColor="white"
              fgColor="#e91e63"
              url="https://www.linkedin.com/company/listmonkey-net/"
            />
            <SocialIcon
              className="si"
              network="twitter"
              bgColor="white"
              fgColor="#e91e63"
            />
            <SocialIcon
              className="si"
              network="facebook"
              bgColor="white"
              fgColor="#e91e63"
              url="https://www.facebook.com/List-Monkey-203337330601812/"
            />
            <SocialIcon
              className="si"
              network="pinterest"
              bgColor="white"
              fgColor="#e91e63"
              url="https://www.pinterest.com/rinafil/"
            />
            <SocialIcon
              className="si"
              network="instagram"
              bgColor="white"
              fgColor="#e91e63"
            />
            <p className="grey-text text-lighten-4">
              Or don't. We really don't care what you do.
            </p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Links</h5>
            <ul>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  About
                </a>
              </li>
              <li>
                <a
                  className="grey-text text-lighten-3"
                  href="https://www.termsfeed.com/privacy-policy/5e247d90e61471783bc5f5d53613b6e3"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Media
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Careers
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2019 Listmonkey, LLC., a Lambda Labs Group
          <a className="grey-text text-lighten-4 right" href="#!">
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
