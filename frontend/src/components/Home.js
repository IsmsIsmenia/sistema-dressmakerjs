import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Sidebar from "./Sidebar";  // ⬅️ importa a sidebar certinho

export default function Home() {
  const { logout } = useContext(AuthContext);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />

      <main style={{ padding: '1rem', flex: 1 }}>
        <h1>Bem-vindo</h1>
        <button onClick={logout}>Sair</button>
      </main>
    </div>
  );
}
