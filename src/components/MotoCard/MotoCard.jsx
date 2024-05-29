import { useState, useEffect, useContext} from "react";
import Modal from "react-modal";
import axios from "axios"
import {UserContext} from "../../context/ContextLogin"
import SucessMsg from "../mensages/successMsg"
import { useMessage} from "../../context/ContextMessage"
import { Link } from "react-router-dom";

// Esta linha define o elemento do aplicativo para acessibilidade (Modal)
Modal.setAppElement('#root');
    
// Função para desativar o scroll da página
function disableBodyScroll() {
  document.body.style.overflow = "hidden";
}

// Função para reativar o scroll da página
function enableBodyScroll() {
  document.body.style.overflow = "";
}
export default function MotoCard({ id, marca, modelo, precoDiario, image }) {


    const {setMessage} = useMessage()
    const [modalIsOpen, setIsOpen] = useState(false);
    const [Erro, setErro] = useState(null)
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState(1)
    const {user, setUser} = useContext(UserContext)
    const diasTotal = precoDiario * value

    useEffect(() => {
        // Verifica se há um usuário no localStorage ao montar o componente
        const userString = localStorage.getItem('user');
        if (userString) {
            const userData = JSON.parse(userString);
            setUser(userData);
        }
    }, [setUser]); // Certifique-se de incluir setUser como uma dependência

    async function AlugarMoto (){

        setLoading(true)
        try{
            const response = await axios.post("https://back-end-bike-shop.vercel.app/user/alugar", {
                id: id,
                diasAlugado: value,
                precoTotal: diasTotal,
                name: user.name,
                userID: user._id,
                image: image
            })
            console.log(response.data)
            setIsOpen(false)
            setValue(1);
            setMessage("Moto Alugada com Sucesso !")
            

        }catch(error){
            // Verifica se o erro é uma instância de AxiosError
            if (axios.isAxiosError(error)) {
                // Acessa os dados retornados no erro, se existirem
                if (error.response && error.response.data) {
                    console.log("Dados de erro:", error.response.data);
                    setErro(error.response.data.erro)
                } else {
                    console.error("Erro Axios:", error);
                }
            } else {
                // Outros tipos de erros que não são do Axios
                console.error("Erro:", error);
            }
        }
        setLoading(false)
    }

    function handleModal() {
        setIsOpen(!modalIsOpen); // Alterna o estado do modal
        setValue(1)
    }

    useEffect(() => {
        if (modalIsOpen) {
          disableBodyScroll();
        } else {
          enableBodyScroll();
        }
      }, [modalIsOpen]);
    
      const increment = () => {
        setValue(prevValue => Math.round(prevValue) + 1);
      };
    
      const decrement = () => {
        if (value > 1) {
          setValue(prevValue => Math.round(prevValue) - 1);
        }
      };
        
    return (
        <>
        
        <div className=" bg-gray-800 w-64 rounded-md m-5  shadow-sm shadow-gray-800 h-80 relative space-y-4 max-sm:w-52 max-sm:h-72 ">
           
            <div className="flex justify-center">
                <img src={image} alt="" className="w-48 bg-cover max-sm:w-32" />
            </div>
            <div className="text-lg p-2 ml-2 space-y-2 max-sm:text-md">
                <h1 className="font-bold text-xl text-white max-sm:text-lg">{marca} {modelo}</h1>
                <p className="text-green-400 font-bold">Custo por dia: R$ {precoDiario},00</p>
            </div>
            {user ? ( 
            <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                <button onClick={handleModal} className="bg-sky-500 font-bold text-white p-2 rounded-md w-48 m-2 max-sm:w-38">Alugar</button>
            </div>) : (
                        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                        <Link to="/login"><button className="bg-gray-400 font-bold text-white p-2 rounded-md w-48 m-2">Faça Login para Alugar</button></Link>
                    </div>
            )}
        </div>
            {/* O modal está aqui, mas só é exibido quando modalIsOpen é verdadeiro */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleModal}
                contentLabel="aluguelModal"
                overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                className="modal-content bg-gray-100 rounded-lg w-96 p-4"
            >
                
                <div className="flex justify-end h-1">
                    <div><button onClick={handleModal} className="font-bold text-3xl text-red-500">X</button></div> 
                </div>

                <div className="space-y-2">
                        <h1 className="text-2xl font-bold">{marca} {modelo}</h1>
                        <hr />
                </div>

                <div className="space-y-3">
                        <img src={image} alt={marca} className="mx-auto" />
                        <p className="text-green-500 text-lg font-bold text-center">R$ {precoDiario} / Dia</p>
                        <div className="flex justify-center text-center">
                            <button onClick={decrement} className="px-3 py-1 bg-gray-800 text-white rounded-l hover:bg-gray-900 ">
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={value}
                                    className="w-40 px-2 py-1 border border-gray-400 text-center"
                                    onChange={(e) => setValue(parseInt(e.target.value))}
                                    min="1"
                                />
                                <button onClick={increment} className="px-3 py-1 bg-gray-800 text-white rounded-r hover:bg-gray-900">
                                    +
                                </button>
                                
                        </div>
                        <div>
                            <h1 className="text-gray-600">Valor Total: </h1>
                            <p className="text-2xl font-bold">R$ {diasTotal}</p>
                        </div>
                </div>
                                 {Erro && 
                                <div className="m-4">
                                    <div className="text-center p-1 bg-Vermelho rounded-xl">
                                            <i class="fa-solid fa-triangle-exclamation"></i> {Erro}
                                    </div>
                                </div>}

                
                <div className="flex justify-center items-end m-4">
                        <div>
                            <button onClick={AlugarMoto} className="bg-amber-400 p-1 rounded-md w-48 hover:bg-amber-500 transition-all disabled:bg-gray-400 disabled:cursor-wait'" disabled={loading}>{loading ? "Alugando..." : "Confirmar"}</button>
                        </div>
                </div> 

            </Modal>

            </>
    )
}
