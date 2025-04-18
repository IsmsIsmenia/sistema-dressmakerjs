import axios from "axios";
import { useState } from "react";
import "../components/login/Login.css";

export default function CadastroUsuario() {
	const [form, setForm] = useState({
		nome: "",
		email: "",
		senha: "",
	});
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:5000/users", form);
			alert("Usuário cadastrado com sucesso!");
		} catch (error) {
			console.error("Erro ao Cadastrar o usuário:", error);
			alert("Erro ao cadastrar");
		}
	};
	return (
		<div className="login-background">
			<form
				onSubmit={handleSubmit}
				className="animate-fadeIn max-w-md mx-auto mt-10 px-8 py-10 bg-white/35 shadow-xl rounded-xl backdrop-blur-md"
			>
				<h2 className="text-3xl font-semibold mb-6 text-[#5D6952] text-center">
					Cadastre-se
				</h2>

				<input
					type="text"
					name="nome"
					placeholder="Nome"
					value={form.nome}
					onChange={handleChange}
					className="text-[#5D6952] text-md input-custom w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B3B796]"
				/>

				<input
					type="email"
					name="email"
					placeholder="E-mail"
					value={form.email}
					onChange={handleChange}
					className=" text-[#5D6952] text-md input-custom w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B3B796]"
				/>

				<input
					type="password"
					name="senha"
					placeholder="Senha"
					value={form.senha}
					onChange={handleChange}
					className=" text-[#5D6952] text-md input-custom w-full mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B3B796]"
				/>

				<button
					type="submit"
					className=" bg-[#5D6952] text-white font-bold py-2 px-4 rounded w-full transition duration-200 ease-in-out hover:bg-[#849573] hover:scale-105"
				>
					Cadastrar
				</button>
			</form>
		</div>
	);
}
