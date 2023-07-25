import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer_container">
      <div className="footer_main">
        <div className="footer_contact">
          <p className="footer_heading"> Contact Us form coming soon... </p>
          <p className="footer_subheading">
            We believe in access to quality skills for everyone. Our company
            opens up doors to breaks down barriers, fosters growth and
            collaboration
          </p>
          <ul className="footer_ul">
            <li>
              <i className="fa-solid fa-globe"></i> fiverr (XYZ Pvt. Ltd.)
            </li>
            <li>
              <i className="fa-solid fa-envelope"></i> mishrakripanshu303@gmail.com
            </li>
            <li>
              <i className="fa-solid fa-clock"></i> 24 X 7
            </li>
          </ul>
        </div>
        <div className="footer_info">
          <p className="footer_heading">Information</p>
          <ul className="footer_ul">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/gigs">Gigs</Link>
            </li>
            {/* <li>
              <Link to="/">Contact Us</Link>
            </li> */}
          </ul>
        </div>
        <div className="footer_social">
          <p className="footer_heading">Social Media</p>
          <p className="footer_subheading"> Connect us on the social media </p>
          <ul className="footer_ul">
            <li className="footer_social_link">
              <a target="_blank" href="https://www.instagram.com/">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a target="_blank" href="https://www.linkedin.com/">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a target="_blank" href="https://www.facebook.com/">
                <i className="fa-brands fa-facebook-messenger"></i>
              </a>
              <a target="_blank" href="https://www.youtube.com/">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
