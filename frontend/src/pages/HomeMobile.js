import { Link } from "react-router-dom";
import maquina_logo from "../assets/linha_mobile.png";
export default function HomeMobile() {
  return (
    <div className="h-screen flex flex-col items-center bg-[#E3E0D7] p-6">
      
      {/* Área superior com saudação e ilustração */}
            <div className="bg-[#244527] w-full max-w-sm p-6 rounded-xl shadow-md flex items-center justify-between">
        {/* Texto à esquerda */}
        <div className="text-left">
            <h1 className="text-white text-2xl font-semibold font-sans">Olá, Julia! ✂️</h1>
            <p className="text-[#E3E0D7] text-sm mt-2 font-sans">
            Pronta para gerenciar sua costura com facilidade?
            </p>
        </div>

        {/* Ícone à direita */}
        <div className="w-24 h-19">
            <img
            src={maquina_logo} 
            alt="Ícone de costura"
            className="w-full h-full"
            />
        </div>
        </div>

      
      <div className="flex flex-col gap-4 mt-8 w-full max-w-sm">
        
        {/* Botão Lista de Pedidos */}
        <Link
          to="/pedidos"
          className="bg-[#564529] text-white py-4 rounded-lg text-center text-lg font-semibold shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-[#8e764f] no-underline"
          >
          📋 Pedidos
        </Link>

        {/* Botão Estoque de Materiais */}
        <Link
          to="/estoque"
          className="bg-[#CCAC85] text-white py-4 rounded-lg text-center text-lg font-semibold shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-[#c7b08a] no-underline "
        >
          🧵 Estoque
        </Link>

        {/* Botão Administração */}
        <Link
          to="/admin"
          className="bg-[#244527] text-white py-4 rounded-lg text-center text-lg font-semibold shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-[#3f673a] no-underline"
        >
          ⚙️ Administração
        </Link>

        {/* Botão Agenda */}
        <Link
          to="/agenda"
          className="bg-[#849573] text-white py-4 rounded-lg text-center text-lg font-semibold shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-[#667f52] no-underline"
        >
          📅 Agenda
        </Link>
      </div>
    </div>
  );
}
