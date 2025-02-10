import React, { useState } from "react";
import axios from "axios";
import "../components/login/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");
    setShowAlert(false);
  
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login", // 🔥 Corrigido para bater com a rota correta do backend
        { email, senha },
        { withCredentials: true } // Garante que os cookies HTTP-Only sejam usados
      );
  
      // 🚀 O token HTTP-Only já está no cookie, então salvar no localStorage pode ser desnecessário
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log("Token recebido:", response.data.token);
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

        <form onSubmit={handleLogin} className="mt-6">
          <div className="inputBox">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 text-sm border rounded-lg"
              placeholder="Email"
            />
          </div>
          <div className="inputBox">
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 text-sm border rounded-lg"
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
        </form>
      </div>
    </div>
  );
};

export default Login;
