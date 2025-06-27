import axios from "axios";
import { Edit, PlusCircle, Trash } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalEditarUsu from "../components/ModalEditarUsu";
import SidebarMenuDesktop from "../components/SidebarMenuDesktop";
import SidebarMenuMobile from "../components/SidebarMenuMobile";
import AuthContext from "../context/AuthContext";

export default function UsuariosAdmin() {
	const navigate = useNavigate();
	const [menuOpen, setMenuOpen] = useState(false);
	const { user } = useContext(AuthContext);

	// Função para abrir e fechar o menu
	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	// Fecha o menu ao clicar fora dele
	const handleClickOutside = (event) => {
		if (menuOpen && !event.target.closest(".sidebar")) {
			setMenuOpen(false);
		}
	};

	// Fecha o menu ao pressionar "Esc"
	const handleKeyDown = (event) => {
		if (event.key === "Escape") {
			setMenuOpen(false);
		}
	};
    //modal de edição
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
	const handleEditClick = (usuario) => {
		setSelectedUser(usuario);
		setIsEditModalOpen(true);
	};
	const handleUpdate = async (updatedUser) => {
		try {
			await axios.put(
				`http://localhost:5000/users/${updatedUser.id}`,
				updatedUser,
				{
					withCredentials: true,
				},
			);
			// Atualiza a lista de usuários local
			setUsuarios((prevUsuarios) =>
				prevUsuarios.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
			);
			setIsEditModalOpen(false);
		} catch (err) {
			console.error("Erro ao atualizar usuário:", err);
		}
	};

	// Adiciona e remove os event listeners
	useEffect(() => {
		if (menuOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("keydown", handleKeyDown);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleKeyDown);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [menuOpen]);

	useEffect(() => {
		const fetchUsuarios = async () => {
			try {
				const response = await axios.get("http://localhost:5000/users", {
					withCredentials: true,
				});
				setUsuarios(response.data);
			} catch (err) {
				console.error("Error ao buscar usuários", err);
			}
		};
		fetchUsuarios();
	}, [user]);

	const [usuarios, setUsuarios] = useState([]);

	return (
		<div className="min-h-screen bg-[#E3E0D7] flex">
			{/* Sidebar */}
			<aside className="hidden md:block bg-[#5D6952] w-64 px-4 py-6">
				<h2 className="text-white text-xl font-semibold mb-4">Menu</h2>
				<SidebarMenuDesktop />
			</aside>

			{/* Conteúdo principal */}
			<div className="flex-1">
				{/* Header (exibido mesmo se mobile) */}
				<header className="bg-[#5D6952] text-white px-4 py-3 shadow-md md:hidden">
					<div className="flex justify-between items-center">
						<button
							type="button"
							onClick={toggleMenu}
							onKeyDown={(e) => e.key === "Enter" && toggleMenu()}
							className="bg-[#5D6952] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md transition hover:bg-[#3f673a]"
						>
							☰ Menu
						</button>
						<SidebarMenuMobile menuOpen={menuOpen} toggleMenu={toggleMenu} />
						<h1 className="text-xl font-semibold">Administração</h1>
					</div>
				</header>

				<main className="p-6">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-xl font-bold text-[#5D6952]">Usuários</h2>
						<button
							onClick={() => navigate("/admin/cadastro")}
							className="flex items-center gap-2 bg-[#5D6952] text-white px-3 py-1 rounded hover:bg-[#849573]"
						>
							<PlusCircle size={18} /> Novo Usuário
						</button>
					</div>

					<div className="space-y-3">
						{usuarios.map((usuario) => (
							<div
								key={usuario.id}
								className="bg-white rounded shadow p-3 flex justify-between items-center"
							>
								<div>
									<p className="text-md font-semibold text-[#5D6952]">
										{usuario.nome}
									</p>
									<p className="text-sm text-gray-600 capitalize">
										{usuario.tipo}
									</p>
								</div>
								<div className="flex gap-3 items-center">
									<button
										className="text-blue-600 hover:text-blue-800"
										onClick={() => handleEditClick(usuario)}
									>
										<Edit size={20} />
									</button>
									<button className="text-red-600 hover:text-red-800"
									onClick={() => {onDelete(userId)
										setMenuOpen(false)
									}}
									>
										<Trash size={20} />
									</button>
								</div>
							</div>
						))}
					</div>
					{isEditModalOpen && selectedUser && (
						<ModalEditarUsu
							user={selectedUser}
							onClose={() => setIsEditModalOpen(false)}
							onSave={handleUpdate}
						/>
					)}
				</main>
			</div>
		</div>
	);
}
