import React from 'react';
import './footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <a className="footer-school" href="https://rs.school/react/">
        <img className="footer-school__image" src="https://rs.school/images/rs_school_js.svg"></img>
      </a>
      <div className="footer-gitlinks">
        <a className="footer-gitlink" href="https://github.com/Perfect03">
          Perfect03
        </a>
        <a className="footer-gitlink" href="https://github.com/Falderian">
          Falderian
        </a>
        <a className="footer-gitlink" href="https://github.com/AlisaFed">
          AlisaFed
        </a>
      </div>
      <p className="footer-year">© 2022</p>
    </footer>
  );
}

export default Footer;
