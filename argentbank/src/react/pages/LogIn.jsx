import PageTitle from "../components/layout/PageTitle";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, fetchUserProfile } from "../../redux/slices/authSlice";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notification, setNotification] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await dispatch(loginUser({ email: username, password })).unwrap();
      if (rememberMe) {
        // Stocker les informations de connexion seulement si "Remember me" est coché
        localStorage.setItem("token", token);
      }

      await dispatch(fetchUserProfile()).unwrap();

      setNotification("Connexion réussie. Redirection en cours...");
      setTimeout(() => navigate("/user"), 3000); // Redirection après un court délai
    } catch (error) {
      console.error("Erreur lors de la connexion ou de la récupération du profil :", error);
      setNotification("Échec de la connexion. Veuillez réessayer.");
      setTimeout(() => setNotification(""), 3000); // Masquer la notification après un délai
    }
  };

  return (
    <>
      <PageTitle title="ArgentBank - LogIn Page" />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Log In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} aria-required="true" required />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} aria-label="Mot de passe" aria-required="true" required />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" checked={rememberMe} onChange={handleRememberMeChange} />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">
              Log In
            </button>
            <p>
              new customer ? <Link to="/SignIn">Sign In </Link>
            </p>
          </form>
        </section>
        {notification && <div className="notification">{notification}</div>}
      </main>
    </>
  );
};

export default LogIn;
