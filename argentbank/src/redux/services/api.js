// services/api.js
import axios from "axios";
import { loginSuccess, loginError } from "../../redux/slices/authSlice";
export const loginAsync = (username, password) => async (dispatch) => {
  try {
    console.log("Sending request to server with:", username, password);
    const response = await axios.post("http://localhost:3001/api/v1/user/login", {
      email: username,
      password: password,
    });
    console.log("Response from server:", response);
    if (response.status === 200) {
      const token = response.data.token;

      // Dispatchez une action pour mettre à jour le store Redux avec le token
      dispatch(loginSuccess({ token }));

      return response; // Retournez la réponse HTTP
    }
  } catch (error) {
    // Gérez les erreurs de connexion
    console.error("Erreur lors de la connexion :", error);
    dispatch(loginError({ error: "Erreur lors de la connexion" }));
    throw error; // Renvoyez l'erreur pour la gérer dans le composant
  }
};
