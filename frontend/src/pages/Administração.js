import { Edit, Trash, PlusCircle } from "lucide-react";

export default function UsuariosAdmin() {
  const usuarios = [
    { id: 1, nome: "Maria Souza", tipo: "admin", email:"julia.sales@example.com" },
    { id: 2, nome: "João Andrade", tipo: "cliente", email:"julia.sales@example.com"},
  ];

  return (
    <div className="min-h-screen bg-[#E3E0D7]">
      {/* Header */}
      <header className="bg-[#5D6952] text-white px-4 py-3 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-lg font-semibold">Administração</h1>
          <nav className="flex gap-3 text-sm">
            <a href="/admin/home" className="hover:underline">Início</a>
            <a href="/admin/usuarios" className="underline font-bold">Agenda</a>
            <a href="/admin/pedidos" className="hover:underline">Pedidos</a>
            <a href="/admin/pedidos" className="hover:underline">Estoque</a>
          </nav>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4 mt-4">
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
                <p className="text-sm font-semibold text-[#5D6952]">{usuario.nome}</p>
                <p className="text-xs text-gray-600 capitalize">{usuario.tipo}</p>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <Edit size={18} />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <Trash size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
