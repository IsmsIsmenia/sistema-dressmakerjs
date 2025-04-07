import React, { useState } from "react";
import axios from "axios";
import "../components/login/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
//import { Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Obtendo a função login do contexto

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");
    setShowAlert(false);
  
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        { email, senha },
        { withCredentials: true }
      );

      if (response.data.user) {
        login(response.data.user); // Atualiza o estado do usuário no contexto
        navigate("/homemobile"); // Redireciona para a Home
      }
      
    } catch (err) {
      if (err.response?.status === 401) {
        setErro("E-mail ou senha incorretos.");
      } else {
        setErro("Erro ao fazer login. Tente novamente.");
      }
      setShowAlert(true);
    }
  };

  return (
    <div className="login-background">
      <div className="login-form">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>

        {/* ALERTA BOOTSTRAP */}
        {showAlert && (
          <div className="alert alert-danger" role="alert">
            {erro}
          </div>
        )}

        <form onSubmit={handleLogin} className="">
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="inputBox group gap-3 flex items-center">
              <input flex-1
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-2 mt-2 text-sm border-none rounded-lg"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="inputBox">
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 text-sm border-none rounded-lg"
              placeholder="Senha"
            />
          </div>
          <div className="inputBox">
            <input type="submit" value="Login" id="btn" />
          </div>
          <div className="group">
            <a href="#">Esqueceu a Senha?</a>
            <a href="#">Cadastre-se</a>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Login;