import { useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import axios from "axios"

export default function alugarMoto(){

    let { id } = useParams()
    const [ moto, setMoto ] = useState({})

    useEffect(() => {
        const getMotoInfo = async () => {
            try{
                const response = await axios.get(`https://back-end-bike-shop.vercel.app/user/moto/${id}`)
                console.log(response.data)
                setMoto(response.data.info)
    
            }catch(erro){
                console.log("erro ao obter informações da moto", erro)
            }
        }
        getMotoInfo();

    }, [id])


    return (
        <div>
            <Navbar />
            <h1>{id}</h1>
                <img src={moto.image} alt="" width=""/>
        </div>
    )   
}

