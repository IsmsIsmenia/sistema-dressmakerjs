import { Edit, PlusCircle, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import SidebarMenuMobile from "../components/SidebarMenuMobile";


export default function UsuariosAdmin() {
	const [menuOpen, setMenuOpen] = useState(false);
	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};
	const usuarios = [
		{
			id: 1,
			nome: "Maria Souza",
			tipo: "admin",
			email: "julia.sales@example.com",
		},
		{
			id: 2,
			nome: "João Andrade",
			tipo: "cliente",
			email: "julia.sales@example.com",
		},
	];

	return (
		<div className="min-h-screen bg-[#E3E0D7] flex">
			{/* Sidebar */}
			<aside className="hidden md:block bg-[#5D6952] w-64 px-4 py-6">
				<h2 className="text-white text-xl font-semibold mb-4">Menu</h2>
				<SidebarMenuMobile />
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
						<h1 className="text-xl font-semibold">Administração</h1>
					</div>
				</header>

				<main className="p-6">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-xl font-bold text-[#5D6952]">Usuários</h2>
						<button className="flex items-center gap-2 bg-[#5D6952] text-white px-3 py-1 rounded hover:bg-[#849573]">
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
									<button className="text-blue-600 hover:text-blue-800">
										<Edit size={20} />
									</button>
									<button className="text-red-600 hover:text-red-800">
										<Trash size={20} />
									</button>
								</div>
							</div>
						))}
					</div>
				</main>
			</div>
		</div>
	);
}
