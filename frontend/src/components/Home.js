import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Bem-vindo</h1>
      <button onClick={logout}>Sair</button>
    </div>
  );
};

export default Home;
