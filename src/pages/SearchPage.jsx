import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import MotoCard from "../components/MotoCard/MotoCard";
import {useMessage} from "../context/ContextMessage"
import {toast, ToastContainer} from "react-toastify"

export default function SearchPage() {
  const { search } = useParams();
  const [motos, setMotos] = useState([])
  const [loading, setLoading] = useState(true);

  const { message, setMessage} = useMessage();

  if (message) { //quando usuario alugar uma moto a mensagem do setMessage la no motocard irá aparecer
    toast.success(message);
    setMessage('')
  }
  
    useEffect(() => {
        const handleSearch = async () => {
            try {
                const response = await axios.get(`https://back-end-bike-shop.vercel.app/buscar/${search}`);
                setMotos(response.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        handleSearch();
    }, [search]);


  return (
    <>
            <Navbar />
            <ToastContainer/>
            <div className="min-h-96">
                <div className="m-5 p-1">
                    <h1 className="text-xl">{motos.length} Resultados para {search}</h1>
                </div>
                {loading ? (
                    <div>Carregando...</div>
                ) : motos.length > 0 ? (
                    <div className="grid grid-cols-4">
                        {motos.map((moto, index) => (
                            <MotoCard key={index} id={moto._id} marca={moto.marca} modelo={moto.modelo} precoDiario={moto.precoDiario} image={moto.image} />
                        ))}
                    </div>
                ) : (
                    <div className="m-5 p-1">
                        <h1>Não foi possível encontrar a moto desejada.</h1>
                    </div>
                )}
            </div>
            <Footer />
        </>
  );
}
