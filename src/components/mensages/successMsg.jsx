import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default  function successMsg({handle}){

    toast.success("Moto Alugada com Sucesso")
    return(
        
        <div>
                {handle && <ToastContainer />}                
        </div>
    )
}