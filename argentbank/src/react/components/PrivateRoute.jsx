import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);

  return token ? children : <Navigate to="/LogIn" />;
};

// Ajout de la validation PropTypes
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
