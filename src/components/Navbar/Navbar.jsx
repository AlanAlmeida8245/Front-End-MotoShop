import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/ContextLogin";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se há um usuário no localStorage ao montar o componente
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData = JSON.parse(userString);
      setUser(userData);
    }
  }, [setUser]); // Certifique-se de incluir setUser como uma dependência

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.location.reload();
  };

  const handleBike = () => {
    navigate(`/buscar/${search}`);
  };

  const handleKleyPress = (event) => {
    if (event.key === "Enter") handleBike();
  };

  return (
    <header className="bg-gray-800 w-full shadow-gray shadow-xl">
      <nav className="flex justify-between p-5 items-center max-md:block max-sm:space-y-2">
        <Link to="/">
          <div className="flex items-center text-white font-bold w-full">
            <h1 className="text-2xl bg-gray-800 p-1 rounded-md text-center">  
              MOTO<span className="text-cyan-400">SHOP</span>
            </h1>
          </div>
        </Link>
        
        <div className="w-96 max-md:w-full">
          <input
            type="text"
            className="w-full rounded-md p-2 m-1"
            placeholder="Ex: Moto Yamaha"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKleyPress}
          />
        </div>

        <div className="flex items-center">
          <ul className="flex gap-4">
            {!user ? (
              <>
                <li>
                  <Link to="/login">
                    <button className="bg-gradient-to-r from-sky-400 to-sky-300 p-2 rounded-md w-24 text-white ">
                      Login
                    </button>   
                  </Link>
                </li>
                <li>
                  <Link to="/registrar">
                    <button className="bg-indigo-900 text-white rounded-md p-2">
                      Cadastrar-se
                    </button>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="text-amber-400">
                  <i className="fa-regular fa-user"></i> Olá, {user.name}
                </li>
                <Link to="/minhasmotos">
                  <li className="text-white hover:text-gray-400">
                    <i className="fa-solid fa-motorcycle"></i> Minhas Motos
                  </li>
                </Link>
                <Link>
                  <li
                    className="text-white hover:text-gray-400"
                    onClick={handleLogout}
                  >
                    <i class="fa-solid fa-door-open"></i> Sair
                  </li>
                </Link>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
