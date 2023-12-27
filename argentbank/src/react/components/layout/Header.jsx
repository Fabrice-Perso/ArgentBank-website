import { argentbankLogo } from "../../../assets/images";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
const Header = () => {
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={argentbankLogo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link className="main-nav-item" to="/sign-in">
          <FaUserCircle />
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Header;
