import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import { useState, useEffect, useContext, useRef } from "react";
import {Link} from "react-router-dom"
import Footer from "../components/Footer/Footer";
import { UserContext } from "../context/ContextLogin";
import MyMotoCard from "../components/MotoCard/myMotoCard";
import {toast, ToastContainer} from "react-toastify"
import { useDeleteMessage }from "../context/ContextDeleteMessage"

export default function MyMotos() {
  const { user, setUser } = useContext(UserContext);
  const [msg, setMsg] = useState(null);
  const [motos, setMotos] = useState([]);
  const { deletemessage, setDeleteMessage } = useDeleteMessage()

  const prevUserIdRef = useRef();

    if(deletemessage){
        toast.success(deletemessage)
    }
    
  useEffect(() => {
    if (user && user._id && user._id !== prevUserIdRef.current) {
      const getMyMotos = async () => {
        console.log(user._id);
        try {
          const response = await axios.get(
            `https://back-end-bike-shop.vercel.app/user/minhasmotos/${user._id}`
          );
          console.log(response.data);
          setMotos(response.data.motos);
          if (response.data.msg) {
            setMsg(response.data.msg);
          }
        } catch (error) {
          console.error("Erro na requisição:", error.message);
          setMsg("Erro com o Servidor");
        }
      };

      getMyMotos();
      prevUserIdRef.current = user._id; // Atualiza o valor do _id anterior
    }
  }, [user]);
  
  const handleDeleteCompleted =  (completed) => {
    if(completed)
    {
        const getMotosUpdate = async () => {
            try {
                const response = await axios.get(
                  `https://back-end-bike-shop.vercel.app/user/minhasmotos/${user._id}`
                );
                console.log(response.data);
                setMotos(response.data.motos);
                if (response.data.msg) {
                  setMsg(response.data.msg);
                }
              } catch (error) {
                console.error("Erro na requisição:", error.message);
                setMsg("Erro com o Servidor");
              }
        }
        setTimeout(getMotosUpdate, 2000)
    }
  }
  
  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="w-full min-h-96">
        <div className="flex justify-center m-5 text-2xl font-bold">
          <h1>
            TOTAL DE<span className="text-amber-500"> {motos ? motos.length : "0"}</span>{" "}
            MOTOS ALUGADAS POR VOCÊ:{" "}
          </h1>
        </div>

        {msg ? (
          <div className="text-center space-y-3">
            <h1>{msg}</h1>
            <Link to={"/motos"}>
                <button className="bg-gray-800 p-2 rounded-md text-white hover:bg-gray-700">
                  Ver Motos
                </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {motos.map((moto) => (
    <MyMotoCard
      key={moto.id}
      marca={moto.marca}
      modelo={moto.modelo}
      image={moto.image}
      preçoTotal={moto.preçoTotal}
      diasAlugado={moto.diasAlugado}
      Data={moto.Data}
      precoDiario={moto.precoDiario}
      moto={moto}
      id={moto.id}
      DataExpirar={moto.DataExpirar}
      OnDeleteCompleted={handleDeleteCompleted}
    />
  ))}
</div>

        )}
      </div>
      <Footer />
    </div>
  );
}
