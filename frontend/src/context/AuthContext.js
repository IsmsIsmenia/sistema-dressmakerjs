import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/me", { withCredentials: true });
        setUser(response.data); // Define o usuário autenticado
      } catch (error) {
        setUser(null); // Caso o token não seja válido, remove o usuário
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = (userData) => {
    console.log("Login realizado. Dados do usuário:", userData);
    setUser(userData);
  };

  const logout = async () => {
    await axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };

  useEffect(() => {
    console.log("Usuário no contexto:", user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
