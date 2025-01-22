import React, { useState } from 'react';
import axios from 'axios';

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form onSubmit={handleLogin} className="mt-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none focus:ring-opacity-50"
            />
          </div>
          {erro && (
            <p className="text-sm text-red-600 mb-4">
              {erro}
            </p>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
