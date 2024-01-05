import PageTitle from "../components/layout/PageTitle"; // Importation du composant PageTitle
import { Link, useNavigate } from "react-router-dom"; // Importation de Link et useNavigate de React Router
import { useState } from "react"; // Importation de useState de React
import { useDispatch } from "react-redux"; // Importation de useDispatch de Redux
import { loginUser, fetchUserProfileAsync } from "../../redux/slices/authSlice"; // Importation des actions loginUser et fetchUserProfileAsync

const SignIn = () => {
  const dispatch = useDispatch(); // Obtention de la fonction dispatch depuis Redux
  const navigate = useNavigate(); // Obtention de la fonction navigate depuis React Router
  const [notification, setNotification] = useState(""); // État pour gérer les notifications
  const [email, setEmail] = useState(""); // État pour le nom d'utilisateur
  const [password, setPassword] = useState(""); // État pour le mot de passe
  const [rememberMe, setRememberMe] = useState(false); // État pour gérer la case à cocher "Se souvenir de moi"
  const [isLoading, setIsLoading] = useState(true); // État pour gérer le chargement

  // Fonction pour gérer le changement de la case à cocher "Se souvenir de moi"
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  // Fonction pour gérer la soumission du formulaire de connexion
  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page)

    setIsLoading(true); // Active le loader

    try {
      const token = await dispatch(loginUser({ email: email, password })).unwrap(); // Appel de l'action loginUser avec les informations d'identification
      if (rememberMe) {
        localStorage.setItem("token", token); // Stockage du token dans le localStorage si "Se souvenir de moi" est activé
      }
      await dispatch(fetchUserProfileAsync()).unwrap(); // Appel de l'action fetchUserProfileAsync pour récupérer le profil utilisateur
      setNotification("Successful login. Redirecting..."); // Affichage d'une notification de réussite
      setTimeout(() => navigate("/user"), 3000); // Redirection vers la page utilisateur après 3 secondes
    } catch (error) {
      console.error("Erreur lors de la connexion ou de la récupération du profil :", error);
      setNotification("Login failed. Please try again."); // Affichage d'une notification d'échec
      setTimeout(() => setNotification(""), 3000); // Suppression de la notification après 3 secondes
    } finally {
      setTimeout(() => setIsLoading(false), 3000); // Désactivation du loader après 3 secondes
    }
  };

  return (
    <>
      <PageTitle title="ArgentBank - SignIn Page" /> {/* Titre de la page */}
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i> {/* Icône utilisateur */}
          <h1>Sign In</h1> {/* Titre de la section */}
          <form onSubmit={handleSubmit}>
            {" "}
            {/* Formulaire de connexion avec gestionnaire de soumission */}
            <div className="input-wrapper">
              <label htmlFor="email">Mail</label> {/* Champ de saisie du nom d'utilisateur */}
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-required="true" required /> {/* Champ contrôlé pour l'email' */}
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label> {/* Champ de saisie du mot de passe */}
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} aria-label="Mot de passe" aria-required="true" required /> {/* Champ contrôlé pour le mot de passe */}
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" checked={rememberMe} onChange={handleRememberMeChange} /> {/* Case à cocher "Se souvenir de moi" */}
              <label htmlFor="remember-me">Remember me</label> {/* Texte associé à la case à cocher */}
            </div>
            <button type="submit" className="sign-in-button">
              Sign In
            </button>{" "}
            {/* Bouton de connexion */}
            <p>
              new customer ? <Link to="/sign-up">Sign Up </Link> {/* Lien vers la page d'inscription */}
            </p>
          </form>
        </section>
        <div className="notification-container">
          {notification && (
            <div className="notification">
              {notification}
              {isLoading && <div className="spinner"></div>} {/* Affichage du spinner de chargement en cas de chargement */}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default SignIn;
