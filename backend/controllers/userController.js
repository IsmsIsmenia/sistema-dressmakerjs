const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models/userModel'); // Importando corretamente o modelo 'Usuario'
const express = require('express');
const { registerValidation } = require('../validations/userValidation');


// Registrar um novo usuário
const registerUser = async (req, res, next) => {
  try {
    // Valida os dados do corpo da requisição
    const { error } = registerValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message }); // Retorna o erro da validação
    }

    const { nome, email, senha, tipo } = req.body;

    // Verifica se o email já existe
    const userExist = await Usuario.findOne({ where: { email } });
    if (userExist) {
      return res.status(400).json({ error: 'Email já cadastrado!' });
    }

    // Criptografa a senha
    const hashedPassword = bcrypt.hashSync(senha, 10);

    // Cria o novo usuário
    const newUser = await Usuario.create({
      nome,
      email,
      senha: hashedPassword,
      tipo: tipo || 'cliente', // Define tipo padrão
    });

    // Gera um token de autenticação
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.tipo },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
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

    // Verifica a senha com await
    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Senha incorreta!' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.tipo },  // Incluindo o tipo/role
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    

    return res.status(200).json({
      message: 'Login bem-sucedido!',
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no login!' });
  }
};


module.exports = {
  registerUser,
  loginUser,
};
