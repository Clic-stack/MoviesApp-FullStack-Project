import axios from "axios";

// Usa la variable de entorno si existe, o el localhost como fallback
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export default axios.create({ baseURL });
