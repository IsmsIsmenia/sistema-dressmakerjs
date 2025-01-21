import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  // Estado para armazenar email e senha
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Enviar dados de login para o backend
      const response = await axios.post('http://localhost:5000/login', {
        email,
        senha
      });

      // Se o login for bem-sucedido, armazenar o token no localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Token recebido:', response.data.token);
        // Redirecionar o usuário para outra página ou exibir um sucesso
      }
    } catch (err) {
      setErro('Erro ao fazer login. Verifique suas credenciais.');
      console.error('Erro no login:', err.response ? err.response.data.message : err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </div>
  );
};

export default Login;
