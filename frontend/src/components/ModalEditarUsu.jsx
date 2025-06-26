import { useState, useEffect } from "react";

export default function ModalEditarUsu({ user, onClose, onSave}){
    const [form, setForm] = useState(user);
    

    useEffect(() => {
        setForm(user);
    }, [user]);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <div className="animate-fadeIn fixed inset-0 bg-white/35 bg-opacity-40 flex items-center justify-center z-40">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm mx-4">
        <h2 className="text-lg font-semibold text-[#5D6952] mb-4">Editar Usuário</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            className="mb-4 w-full p-2 border rounded"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mb-4 w-full p-2 border rounded"
          />
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="mb-4 w-full p-2 border rounded"
          >
            <option value="admin">Admin</option>
            <option value="cliente">Cliente</option>
          </select>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-[#5D6952] text-white px-4 py-2 rounded hover:bg-[#849573]"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>

        </div>
    )
}