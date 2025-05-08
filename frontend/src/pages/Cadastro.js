import axios from "axios";
import { useState } from "react";
import "../components/login/Login.css";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function CadastroUsuario({ isAdmin = false }) {
	const navigate = useNavigate();
	const [showAlert, setShowAlert] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [mostrarSenha, setMostrarSenha] = useState(false);
	const [erro, setErro] = useState("");
	const [form, setForm] = useState({
		nome: "",
		email: "",
		senha: "",
		tipo: "cliente", // default
	});
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:5000/auth/register", form);
			setShowSuccessModal(true);
		} catch (error) {
			setErro("Erro ao Cadastrar o usuário:", error);
		}
		setShowAlert(true);
		setTimeout(() => setShowAlert(false), 3000);
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
				{showAlert && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
						{erro}
					</div>
				)}
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

				<div className="relative mb-6">
					<input
						type={mostrarSenha ? "text" : "password"}
						name="senha"
						placeholder="Senha"
						value={form.senha}
						onChange={handleChange}
						className="text-[#5D6952] text-md input-custom w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B3B796]"
					/>
					<button
						type="button"
						onClick={() => setMostrarSenha((prev) => !prev)}
						aria-label="Mostrar senha"
						className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#5D6952]"
					>
						{mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
					</button>
				</div>

				{isAdmin && (
					<select
						name="tipo"
						value={form.tipo}
						onChange={handleChange}
						className="input-custom w-full mb-4 px-4 py-2 border border-gray-300 rounded"
					>
						<option value="cliente">Cliente</option>
						<option value="admin">Admin</option>
					</select>
				)}

				<div className="flex justify-between gap-4 mt-4">
					<button
						type="button"
						onClick={() => navigate(-1)}
						className=" bg-[#909888] text-white font-bold py-2 px-6 rounded w-1/3 transition duration-200 ease-in-out hover:bg-[#a8b79a] hover:scale-105 "
					>
						Voltar
					</button>
					<button
						type="submit"
						className=" bg-[#5D6952] text-white font-bold py-2 px-4 rounded w-2/3 transition duration-200 ease-in-out hover:bg-[#849573] hover:scale-105"
					>
						Cadastrar
					</button>
				</div>
			</form>
			{showSuccessModal && (
				<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
					<div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full">
						<h3 className="text-lg font-semibold text-[#5D6952] mb-4">
							Cadastro realizado com sucesso!
						</h3>
						<p className="text-sm text-gray-600 mb-6">
							Você pode voltar para a tela de login agora.
						</p>
						<div className="flex justify-end gap-4">
							<button
								onClick={() => (window.location.href = "/login")}
								className="bg-[#5D6952] text-white px-4 py-2 rounded hover:bg-[#849573]"
							>
								Ir para o Login
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
