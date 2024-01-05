import { useState } from "react"; // Importation du hook useState de React
import { useSelector, useDispatch } from "react-redux"; // Importation des hooks useSelector et useDispatch de React Redux
import { argentbankLogo } from "../../../assets/images"; // Importation de l'image "argentbankLogo"
import { Link } from "react-router-dom"; // Importation du composant "Link" de React Router
import { logout } from "../../../redux/slices/authSlice"; // Importation de l'action "logout" depuis le slice "authSlice" pour gérer la déconnexion de l'utilisateur

// Constantes pour les chaînes de caractères
const SIGN_IN = "Sign In";
const SIGN_OUT = "Sign Out";
const LOGOUT_MESSAGE = "You have been logged out.";

const Header = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  // Gestion de la déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    setShowLogoutMessage(true);
    setTimeout(() => setShowLogoutMessage(false), 3000);
  };

  // Fonction utilitaire pour générer des classes d'icônes FontAwesome
  const getIconClass = (iconName) => `fa fa-${iconName}`;

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={argentbankLogo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {token ? (
          <div>
            <Link className="main-nav-item" to="/user">
              <i className={getIconClass("user-circle")}></i>
              {`${user?.userName}`}
            </Link>
            <Link className="main-nav-item" to="/" onClick={handleLogout}>
              <i className={getIconClass("sign-out")}></i>
              {SIGN_OUT}
            </Link>
          </div>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            {SIGN_IN}
          </Link>
        )}
      </div>
      {showLogoutMessage && <div className="notification">{LOGOUT_MESSAGE}</div>}
    </nav>
  );
};

export default Header;
