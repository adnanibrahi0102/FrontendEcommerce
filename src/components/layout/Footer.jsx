import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5 text-center">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h4>All rights reserved &copy; <span>Developed by </span>AdnanIbrahim </h4>
            <p className="mt-3">
              <Link to='/about' className="text-light mx-2">About</Link>
              <span className="text-light">|</span>
              <Link to='/contact' className="text-light mx-2">Contact</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
