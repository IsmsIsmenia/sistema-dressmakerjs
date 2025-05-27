import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import maquina_logo from "../assets/maquina_icon.png";

export default function SidebarMenuMobile({ menuOpen, toggleMenu }) {
  const { logout } = useContext(AuthContext);

  return (
    <>
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-[#5D6952] shadow-lg transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"} z-30 sidebar`}>
        <div className="flex flex-col items-center p-6">
          <img src={maquina_logo} alt="Ícone" className="w-12 h-12 mb-4" />
          <h2 className="text-white text-lg font-semibold">Menu</h2>

          <nav className="mt-4 flex flex-col space-y-4 w-full">
            <Link to="/pedidos" className="text-white text-lg flex items-center gap-2 no-underline">📋 Pedidos</Link>
            <Link to="/admin" className="text-white text-lg flex items-center gap-2 no-underline">⚙️ Administração</Link>
            <Link to="/estoque" className="text-white text-lg flex items-center gap-2 no-underline">🧵 Estoque</Link>
            <Link to="/agenda" className="text-white text-lg flex items-center gap-2 no-underline">📅 Agenda</Link>
          </nav>

          {/* Botão de Logout */}
          <div className="absolute bottom-6 left-0 w-full flex justify-center">
            <button
              type="button"
              onClick={logout}
              className="mt-auto bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-md transition-all duration-300 hover:bg-red-700"
            >
              🚪 Sair
            </button>
          </div>
        </div>
      </div>

      {/* Fundo escuro ao abrir o menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
}
