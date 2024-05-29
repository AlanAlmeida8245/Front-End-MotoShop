import Modal from "react-modal";
import { useState, useEffect, useContext} from "react";
import axios from "axios"
import {UserContext} from "../../context/ContextLogin"
import {toast, ToastContainer} from "react-toastify"
import { useMessage } from "../../context/ContextMessage";

function disableBodyScroll() {
  document.body.style.overflow = "hidden";
}

// Função para reativar o scroll da página
function enableBodyScroll() {
  document.body.style.overflow = "";
}

export default function DeleteModal({ visible, onClose, Moto, id, onDeleteMessage}) {

  
    const {user, setUser} = useContext(UserContext)
    const {setMessage} = useMessage()
    useEffect(() => {
        // Verifica se há um usuário no localStorage ao montar o componente
        const userString = localStorage.getItem('user');
        if (userString) {
            const userData = JSON.parse(userString);
            setUser(userData);
        }
    }, [setUser]); // Certifique-se de incluir setUser como uma dependência


  // Definir estado para controlar a visibilidade do modal
  const [modalIsOpen, setModalIsOpen] = useState(visible);

  // Atualizar o estado interno quando a propriedade visible mudar
  useEffect(() => {
    setModalIsOpen(visible);
  }, [visible]);

  // Função para fechar o modal

  useEffect(() => {
    if (modalIsOpen) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }
  }, [modalIsOpen]);

    const handleDelete = async () => {
        try{
            const response = await axios.post("https://back-end-bike-shop.vercel.app/user/cancelaraluguel", {
                userID: user._id,
                idMoto: id
            })
            if(response.data.message){
                onClose(); //fechará o modal
                onDeleteMessage(response.data.message)
            }

        }catch(err){
            console.log(err)
        }
    }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onClose}
      contentLabel="deleteModal"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      className="modal-content bg-gray-100 rounded-lg w-96 p-4 space-y-4"
    >
      <div>Tem certeza que deseja cancelar o aluguel da moto {Moto.marca} {Moto.modelo}?</div>
      <div className="flex justify-center space-x-4">
        <button className="bg-amber-500 p-1 rounded-md hover:bg-amber-600 transition-all" onClick={handleDelete}>Confirmar</button>
        <button className="bg-gray-800 text-white p-1 rounded-md hover:bg-gray-900 transition-all" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </Modal>
  );
}
