import moment from "moment";
import {ToastContainer, toast } from 'react-toastify';
import {useState, useEffect} from "react"
import DeleteModal from "../Modals/DeleteModal"
import { useDeleteMessage } from "../../context/ContextDeleteMessage"


export default function MyMotoCard({
  id,
  marca,
  modelo,
  preçoTotal,
  diasAlugado,
  image,
  Data,
  moto,
  DataExpirar,
  OnDeleteCompleted
}) {
  const dataAluguel = moment(Data); // Data de aluguel
  const diasAluguel = diasAlugado; // Número de dias selecionados para o aluguel
  // Calculando a data de expiração adicionando os dias de aluguel à data de aluguel
  const dataExpiracaoAluguel = dataAluguel.clone().add(diasAluguel, "days");

  const [modalIsOpen, setIsOpen] = useState(false);
  const [aluguelExpirou, setExpirou] = useState(false);
  const { Deletemessage, setDeleteMessage } = useDeleteMessage();

  const handleDeleteMessage = (message) => {
    setDeleteMessage(message);
    OnDeleteCompleted(true);
  };

  function openModal() {
    setIsOpen(true);
  }

  // Função para fechar o modal
  function closeModal() {
    setIsOpen(false);
  }

  // Verificando se a data de expiração já passou ou é a mesma data atual
  useEffect(() => {
    const dataAtual = moment();
    if (dataAtual.isSameOrAfter(dataExpiracaoAluguel, "day")) {
      setExpirou(true);
    }
  }, []);

  return (
    <div>
      <ToastContainer />
      <DeleteModal
        visible={modalIsOpen}
        onClose={closeModal}
        Moto={moto}
        id={id}
        onDeleteMessage={handleDeleteMessage}
      />
      <div className={`bg-gray-800 w-72 rounded-xl m-5 shadow shadow-gray-600 min-h-80 relative space-y-1 ${aluguelExpirou ? 'filter grayscale' : ''}`}>
        <button className="h-8" onClick={openModal}>
          <i className="fa-sharp fa-solid fa-trash fa-bounce text-Vermelho m-2 p-1 w-12"></i>
        </button>
        <div className="flex justify-center">
          <img src={image} alt="" className="w-48 bg-cover" />
        </div>
        <div className="text-lg p-2 space-y-2">
          <h1 className="font-bold text-xl text-cyan-400 text-center">
            {marca} {modelo}
          </h1>
  
          <div className="grid grid-cols-2">
            <div className="flex  flex-col text-center text-white">
              <h1>Custo Diario</h1>
              <p className="text-green-400 font-bold">
                R$ {preçoTotal / diasAlugado}
              </p>
            </div>
            <div className="flex flex-col text-center  text-white">
              <h1>Dias Alugado </h1>
              <p className="font-bold text-cyan-400">{diasAlugado}</p>
            </div>
            <div className="flex flex-col text-center  text-white">
              <h1>{aluguelExpirou ? "Expirou em:" : "Expira em:" }</h1>
              <p className="text-Vermelho font-bold">
                {dataExpiracaoAluguel.format("DD/MM/YYYY")}
              </p>
            </div>
            <div className="flex flex-col text-center  text-white">
              <h1>Preço Total </h1>
              <p className="font-bold text-amber-500">R$ {preçoTotal}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
