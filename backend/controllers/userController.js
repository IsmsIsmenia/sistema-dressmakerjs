const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models'); // Importando corretamente o modelo 'Usuario'
const express = require('express');
const { registerValidation } = require('../validations/userValidation');

// Registrar um novo usuário
const registerUser = async (req, res, next) => {
  try {
    // Valida os dados do corpo da requisição
    const { error } = registerValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { nome, email, senha, tipo } = req.body;

    // Verifica se o email já existe
    const userExist = await Usuario.findOne({ where: { email } });
    if (userExist) {
      return res.status(400).json({ error: 'Email já cadastrado!' });
    }

    // Criptografa a senha de forma assíncrona
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Cria o novo usuário
    const newUser = await Usuario.create({
      nome,
      email,
      senha: hashedPassword,
      tipo: tipo || 'cliente',
    });

    // Gera um token de autenticação
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.tipo },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.status(201).json({
      message: 'Usuário criado com sucesso!',
      user: {
        id: newUser.id,
        nome: newUser.nome,
        email: newUser.email,
        tipo: newUser.tipo,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar usuário!' });
  }
};

// Login do usuário
const loginUser = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await Usuario.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado!' });
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Senha incorreta!' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.tipo },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    // Define o cookie HTTP-Only
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Apenas HTTPS em produção
      sameSite: 'Strict', // Protege contra CSRF
      maxAge: 2 * 60 * 60 * 1000 // 2 horas
    });

    // Removendo a senha antes de retornar o usuário
    const userWithoutPassword = { ...user.toJSON() };
    delete userWithoutPassword.senha;

    return res.status(200).json({
      message: 'Login bem-sucedido!',
      user: userWithoutPassword
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no login!' });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict'
  });
  res.status(200).json({ message: 'Logout realizado com sucesso!' });
};


//CRUD - READ 
const getUsers = async (req, res, next) => {
  try {
    const users = await Usuario.findAll();
    const usersWithoutPasswords = users.map(user => {
      const userData = user.toJSON();
      delete userData.senha;
      return userData;
    });
    res.json(usersWithoutPasswords);
  } catch (err) {
    next(err);
  }
};

//CRUD - READ específico
const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Usuario.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    const userWithoutPassword = { ...user.toJSON() };
    delete userWithoutPassword.senha;
    res.json(userWithoutPassword);
  } catch (err) {
    next(err);
  }
};

//CRUD - UPDATE
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  try {
    const user = await Usuario.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const updateData = { nome, email };
    if (senha) {
      updateData.senha = await bcrypt.hash(senha, 10);
    }

    await user.update(updateData);
    res.json({ message: 'Usuário atualizado com sucesso!' });
  } catch (err) {
    next(err);
  }
};

//CRUD - DELETE
const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Usuario.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    await user.destroy();
    res.status(200).json({ message: 'Usuário excluído com sucesso!' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
