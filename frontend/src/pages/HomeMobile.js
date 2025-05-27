import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import linha_logo from "../assets/linha_mobile.png";
import maquina_logo from "../assets/maquina_icon.png";
import SidebarMenuMobile from "../components/SidebarMenuMobile";
import AuthContext from "../context/AuthContext";

export default function HomeMobile() {
	const { logout } = useContext(AuthContext);
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

	return (
		<div className="min-h-screen flex flex-col bg-[#E3E0D7] relative pt-4">
			{/* Botão para abrir o menu */}
			<button
				type="button"
				onClick={toggleMenu}
				onKeyDown={(e) => e.key === "Enter" && toggleMenu()}
				className="ml-6 mt-2 bg-[#5D6952] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md transition hover:bg-[#3f673a] z-20 self-start"
			>
				☰ Menu
			</button>

			{/* Sidebar deslizante */}
			<SidebarMenuMobile menuOpen={menuOpen} toggleMenu={toggleMenu} />

			{/* Conteúdo principal */}
			<div className="flex-1 flex flex-col items-center p-6">
				{/* Saudação */}
				<div className="bg-[#5D6952] w-full max-w-sm p-6 rounded-xl shadow-md flex items-center justify-between">
					<div className="text-left">
						<h1 className="text-white text-2xl font-semibold">
							Olá, {user.nome}!✂️
						</h1>
						<p className="text-[#E3E0D7] text-sm mt-2">
							Pronta para gerenciar sua costura com facilidade?
						</p>
					</div>
					<div className="w-24 h-19">
						<img
							src={linha_logo}
							alt="Ícone de costura"
							className="w-full h-full"
						/>
					</div>
				</div>

				{/* Botões principais */}
				<div className="flex flex-col gap-4 mt-8 w-full max-w-sm">
					<Link
						to="/pedidos"
						className="bg-[#564529] text-white py-4 rounded-lg text-center text-lg font-semibold shadow-md hover:bg-[#8e764f] transition duration-300 transform hover:scale-105 focus:scale-105 active:scale-100 no-underline"
					>
						📋 Pedidos
					</Link>
					<Link
						to="/adminmobile"
						className="bg-[#5D6952] text-white py-4 rounded-lg text-center text-lg font-semibold shadow-md hover:bg-[#3f673a] transition duration-300 transform hover:scale-105 focus:scale-105 active:scale-100 no-underline"
					>
						⚙️ Administração
					</Link>
					<Link
						to="/estoque"
						className="bg-[#CCAC85] text-white py-4 rounded-lg text-center text-lg font-semibold shadow-md hover:bg-[#c7b08a] transition duration-300 transform hover:scale-105 focus:scale-105 active:scale-100 no-underline"
					>
						🧵 Estoque
					</Link>
					<Link
						to="/agenda"
						className="bg-[#849573] text-white py-4 rounded-lg text-center text-lg font-semibold shadow-md hover:bg-[#667f52] transition duration-300 transform hover:scale-105 focus:scale-105 active:scale-100 no-underline"
					>
						📅 Agenda
					</Link>
				</div>
			</div>
		</div>
	);
}
