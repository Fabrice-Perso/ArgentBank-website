// Importation des styles principaux
import "./sass/main.scss";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// Importation des pages React
import Home from "./react/pages/Home";
import MissingPage from "./react/pages/MissingPage";
import SignIn from "./react/pages/SignIn";
import User from "./react/pages/User";
function App() {
  // Définir le basename en fonction de l'environnement
  const basename = import.meta.env.MODE === "production" ? "/ArgentBank/" : "";

  return (
    <>
      <Router basename={basename}>
        <Routes>
          {/* Redirection de la racine vers /Accueil */}
          <Route path="/" element={<Home />} />
          {/* Redirection de /SignIn vers /Sign-in */}
          <Route path="/SignIn" element={<Navigate to="/Sign-in" replace />} />
          <Route path="/Sign-in" element={<SignIn />} />
          <Route path="/User" element={<User />} />
          <Route path="/error404" element={<MissingPage />} />
          {/* Redirection vers `/error404` pour tout autre chemin non reconnu */}
          <Route path="*" element={<Navigate to="/error404" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
