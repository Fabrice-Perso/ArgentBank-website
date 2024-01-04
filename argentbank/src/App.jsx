import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { restoreSession, fetchUserProfile } from "./redux/slices/authSlice";
// Importation des styles principaux
import "./sass/main.scss";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// Importation des pages React
import Home from "./react/pages/Home";
import MissingPage from "./react/pages/MissingPage";
import SignUp from "./react/pages/SignUp";
import SignIn from "./react/pages/SignIn";
import User from "./react/pages/User";
import PrivateRoute from "./react/components/PrivateRoute";
import Header from "./react/components/layout/Header";
import Loader from "./react/components/ui/Loader";
import Footer from "./react/components/layout/Footer";

function SessionHandler() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(restoreSession(token));
      dispatch(fetchUserProfile());
      navigate("/user"); // Redirige vers la page utilisateur si un token existe
    }
  }, [dispatch, navigate]);

  return null;
}
function App() {
  const basename = import.meta.env.MODE === "production" ? "/ArgentBank/" : "";

  return (
    <>
      <Router basename={basename}>
        <Header />
        <SessionHandler />
        <Loader timeout={3000} />
        <Routes>
          {/* Redirection de la racine vers /Accueil */}
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<SignIn />} />
          {/* Redirection de /SignUp vers /Sign-up */}
          <Route path="/SignUp" element={<Navigate to="/Sign-up" replace />} />
          <Route path="/Sign-up" element={<SignUp />} />
          <Route
            path="/User"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />
          <Route path="/error404" element={<MissingPage />} />
          {/* Redirection vers `/error404` pour tout autre chemin non reconnu */}
          <Route path="*" element={<Navigate to="/error404" replace />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
