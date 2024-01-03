import PageTitle from "../components/layout/PageTitle";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, fetchUserProfile } from "../../redux/slices/authSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notification, setNotification] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true); // Activer le loader

    try {
      const token = await dispatch(loginUser({ email: username, password })).unwrap();
      if (rememberMe) {
        localStorage.setItem("token", token);
      }
      await dispatch(fetchUserProfile()).unwrap();
      setNotification("Connexion réussie. Redirection en cours...");
      setTimeout(() => navigate("/user"), 3000);
    } catch (error) {
      console.error("Erreur lors de la connexion ou de la récupération du profil :", error);
      setNotification("Échec de la connexion. Veuillez réessayer.");
      setTimeout(() => setNotification(""), 3000);
    } finally {
      setTimeout(() => setIsLoading(false), 3000);
    }
  };

  return (
    <>
      <PageTitle title="ArgentBank - SignIn Page" />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
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
              Sign In
            </button>
            <p>
              new customer ? <Link to="/SignUp">Sign Up </Link>
            </p>
          </form>
        </section>
        <div className="notification-container">
          {notification && (
            <div className="notification">
              {notification}
              {isLoading && <div className="spinner"></div>}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default SignIn;
