// Importation des composants de React Router
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Importation des composants et des pages
import Home from "./react/pages/Home";
import MissingPage from "./react/pages/MissingPage";
import SignUp from "./react/pages/SignUp";
import SignIn from "./react/pages/SignIn";
import User from "./react/pages/User";
import PrivateRoute from "./react/components/auth/PrivateRoute";
import Header from "./react/components/layout/Header";
import Loader from "./react/components/ui/Loader";
import Footer from "./react/components/layout/Footer";

// Importation du gestionnaire de session et de la configuration
import { basename } from "./react/config";

// Importation des styles principaux
import "./sass/main.scss";

function App() {
  return (
    <>
      <Router basename={basename}>
        <Header />
        {/* <SessionHandler /> */}
        <Loader timeout={3000} />
        <Routes>
          {/* Routes principales de l'application */}
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/User"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />
          <Route path="/error404" element={<MissingPage />} />
          {/* Gestion des chemins non reconnus */}
          <Route path="*" element={<Navigate to="/error404" replace />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
