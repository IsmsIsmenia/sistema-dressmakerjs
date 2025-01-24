import React, { useState } from 'react';
import axios from 'axios';
import '../components/login/Login.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        senha,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Token recebido:', response.data.token);
      }
    } catch (err) {
      setErro('Erro ao fazer login. Verifique suas credenciais.');
      console.error('Erro no login:', err.response?.data.message || err.message);
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
              className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none focus:ring-opacity-50"
              placeholder="Email"
            />
          </div>
          <div className="inputBox">
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none focus:ring-opacity-50"
              placeholder="Senha"
            />
          </div>
          <div className="inputBox">
            <input
              type="submit"
              value="Login"
              id="btn"
            />
          </div>
          <div class="group">
                <a href="#">Esqueceu a Senha?</a>
                <a href="#">Cadastre-se</a>
            </div>
          {erro && (
            <p className="text-sm text-red-600 mb-4">
              {erro}
            </p>
          )}
        </form>
      </div>
    </div>
  );  
};

export default Login;
