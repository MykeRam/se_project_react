import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__copyright">
        © {currentYear} WTWR Developed by Michael Ramirez
      </p>
    </footer>
  );
}

export default Footer;