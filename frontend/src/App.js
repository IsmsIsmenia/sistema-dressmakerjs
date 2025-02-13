import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.js';
import PrivateRoute from './components/PrivateRoute';
import Home from "./components/Home";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        {/* Rotas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
