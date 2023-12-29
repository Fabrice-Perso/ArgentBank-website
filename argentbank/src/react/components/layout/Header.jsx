import { useSelector, useDispatch } from "react-redux";
import { argentbankLogo } from "../../../assets/images";
import { Link } from "react-router-dom";
import { logout } from "../../../redux/slices/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprimer le token du localStorage
    dispatch(logout()); // Réinitialiser l'état d'authentification dans le Redux store
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={argentbankLogo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {token ? (
          // Affichez les informations de l'utilisateur et le lien de déconnexion si connecté
          <div>
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>
              {user?.firstName}
            </Link>
            <Link className="main-nav-item" to="/" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </div>
        ) : (
          // Affichez le lien de connexion si non connecté
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
