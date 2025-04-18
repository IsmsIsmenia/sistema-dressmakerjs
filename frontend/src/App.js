import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.js';
import PrivateRoute from './components/PrivateRoute';
import Home from "./components/Home";
import HomeMobile from './pages/HomeMobile.js';
import CadastroUsuario from './pages/Cadastro.js';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login será acessível em /login */}
        <Route path="/login" element={<Login />} />

        {/* Redireciona para /login por padrão */}
        <Route path="/" element={<Login />} />

        {/* Rotas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/homemobile" element={<HomeMobile />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
        </Route>
      </Routes>
    </Router>
  );
};


export default App;
