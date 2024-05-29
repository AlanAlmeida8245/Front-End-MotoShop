
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import MotoCard from "../components/MotoCard/MotoCard"
import {useEffect, useState, useContext} from "react"
import axios from "axios"

import {useMessage} from "../context/ContextMessage"
import {ToastContainer, toast } from 'react-toastify';


export default function Motos(){

    const { message, setMessage} = useMessage();
    const [motos, setMotos] = useState([])

          
              if (message) { //quando usuario alugar uma moto a mensagem do setMessage la no motocard irá aparecer
                  toast.success(message);
                  setMessage('')
                }


    const getMotos = async () => {
        const response = await axios.get("https://back-end-bike-shop.vercel.app/user/motos")
        console.log(response.data)
        setMotos(response.data.motos)
       
    }
    useEffect(() => {
        getMotos();
    }, [])

    return(
        <div className="">
            <Navbar />
                <ToastContainer />
                <div className="w-full">
                            <div className="text-3xl p-5 ml-5 ">
                                <h1 className="text-gray-800 font-bold">MOTOS DISPONIVEIS:</h1>
                                <hr className="bg-sky-400 w-96"/>   
                            </div>
                </div>
                <div className="grid grid-cols-4 w-full m-2 max-sm:grid-cols-2
                max-md:grid-cols-2">
                    {motos.map((moto) => (
                        <MotoCard id={moto._id} marca={moto.marca} modelo={moto.modelo} precoDiario={moto.precoDiario} image={moto.image}/>
                    ))}
                </div>
            <Footer /> 
        </div>
    )
}

