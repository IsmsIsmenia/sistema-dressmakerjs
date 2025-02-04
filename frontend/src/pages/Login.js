import React, { useState } from "react";
import axios from "axios";
import '../components/login/Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [erroEmail, setErroEmail] = useState(false);
  const [erroSenha, setErroSenha] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErroEmail(false);
    setErroSenha(false);
    setErro("");
  
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        senha,
      });
  
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log("Token recebido:", response.data.token);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // Erro de credenciais inválidas
        setErro("E-mail ou senha incorretos.");
      } else {
        // Outro erro qualquer
        setErro("Erro ao fazer login. Tente novamente.");
      }
      setErroEmail(true);
      setErroSenha(true);
    }
  };
  

  return (
    <div className="login-background">
      <div className="login-form">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form onSubmit={handleLogin} className="mt-6">
          <div className="inputBox">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none focus:ring-opacity-50 ${
                erroEmail ? "error" : ""
              }`}
              placeholder="Email"
            />
          </div>
          <div className="inputBox">
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className={`w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none focus:ring-opacity-50 ${
              erro ? "error" : ""
            }`}
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
          {erro && <p className="text-sm text-red-600 mb-4">{erro}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
