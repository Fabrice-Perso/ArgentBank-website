// Importation de la fonction configureStore de Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";
// Importation du réducteur authReducer depuis le fichier "authSlice.js"
import authReducer from "./slices/authSlice";

// Configuration du magasin Redux en utilisant configureStore
const store = configureStore({
  reducer: {
    auth: authReducer, // Ajout du réducteur "authReducer" sous le nom "auth" dans le magasin
  },
});

// Exportation du magasin configuré
export default store;
