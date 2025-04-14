import { useState } from "react";
import axios from "axios";

export default function CadastroUsuario(){
    const [form, setForm] = useState({
        nome: "",
        email: "",
        senha: ""
    });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post ("http://localhost:5000/users", form);
            alert("Usuário cadastrado com sucesso!");
        } catch (error) {
            console.error("Erro ao Cadastrar o usuário:", error)
            alert("Erro ao cadastrar");
        }
    }
}