// Importation de la fonction configureStore de Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// Importation du réducteur authReducer depuis le fichier "authSlice.js"
import authReducer from "./slices/authSlice";

// Configuration de Redux Persist pour le reducer d'authentification
const authPersistConfig = {
  key: "auth", // La clé utilisée pour stocker l'état dans le stockage local
  storage, // Méthode de stockage (stockage local par défaut)
};

// Application de Redux Persist au reducer d'authentification
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
// Configuration du magasin Redux en utilisant configureStore
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Ajout du réducteur "authReducer" sous le nom "auth" dans le magasin
  },

  // Configuration du middleware pour éviter les avertissements de sérialisation
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/PAUSE", "persist/PURGE", "persist/REGISTER", "persist/FLUSH"],
      },
    }),
});

// Création de l'objet persistor pour permettre la réhydratation de l'état
const persistor = persistStore(store);

// Exportation du store et du persistor pour utilisation dans l'application
export { store, persistor };
