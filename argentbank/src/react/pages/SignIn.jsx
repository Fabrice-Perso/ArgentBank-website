import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import PageTitle from "../components/layout/PageTitle";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, fetchUserProfile } from "../../redux/slices/authSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await dispatch(loginUser({ email: username, password })).unwrap();
      localStorage.setItem("token", token); // Stocker le token dans le local storage

      // Dispatch l'action pour récupérer le profil de l'utilisateur
      await dispatch(fetchUserProfile()).unwrap();

      navigate("/user"); // Redirection vers '/user' après avoir récupéré le profil
    } catch (error) {
      console.error("Erreur lors de la connexion ou de la récupération du profil :", error);
      // Gérer les erreurs de connexion ici
    }
  };
  return (
    <>
      <PageTitle title="ArgentBank - Sign-in Page" />
      <Header />
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
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SignIn;
