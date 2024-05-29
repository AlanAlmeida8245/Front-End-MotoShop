
  import Moto from "../../assets/moto-header.webp"
  import {Link} from "react-router-dom"

  export default function Header() {
    return (
        <header className="w-full shadow-sm rounded-b-md">
            <div className="justify-center p-5 m-5 text-center mt-10 ">
              <div className="max-sm:space-y-2">
                  <h1 className="text-4xl font-bold max-sm:text-2xl">BEM-VINDO A <span className="text-white bg-gray-800 p-1 rounded-md">MOTO<span className="text-cyan-400">SHOP</span></span></h1>
                  <h2 className="text-2xl font-bold text-gray-800 max-sm:text-lg">O Lugar perfeito para você achar sua Moto Perfeita</h2>
                  <p className="text-gray-800 text-xl max-sm:text-sm">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi voluptate similique autem tempore aliquid</p>
              </div>

              <div className="mt-5 p-5">
                    <Link to={"/motos"}><button className="bg-cyan-500 p-2 text-white font-bold rounded-md m-2 shadow-md w-40 hover:bg-cyan-700 transition-all max-sm:w-24 max-sm:text-sm">Ver Motos</button></Link>
                    <button className="bg-gray-800 hover:bg-gray-700 transition-all p-2  font-bold rounded-md m-2 shadow-md w-40 text-cyan-400 max-sm:w-24 max-sm:text-sm">  Sobre  </button>
              </div>

            </div>
        </header>
    )
  }
  