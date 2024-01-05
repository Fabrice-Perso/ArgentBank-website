// Importation de la variable databaseUrl à partir des variables d'environnement de Vite
const databaseUrl = import.meta.env.VITE_DATABASE_URL;

// Exportation de la variable databaseUrl pour la rendre accessible depuis d'autres fichiers
export { databaseUrl };
