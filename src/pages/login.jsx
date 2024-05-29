import React from 'react';
import { Link } from 'react-router-dom';
import {useState, useContext} from "react"
import { useNavigate } from "react-router-dom" 
import axios from "axios"
import {UserContext} from "../context/ContextLogin"

export default function LoginPage() {

        const {user, setUser} = useContext(UserContext)
        const navigate = useNavigate();

        
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const [Erro, setErro] = useState(null)
        const [loading, setLoading] = useState(false)
                


    const handleLogin = async  (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            const dados = {
                email: email,
                password: password
            };

            const response = await axios.post("https://back-end-bike-shop.vercel.app/login", dados)
            if(response.data && response.data.erro){
                setErro(response.data.erro)
            }else{
                //caso o usuario logue com sucesso!
                setErro(null)
                console.log(response.data)
                const userData = response.data.user
                setUser(userData)
                localStorage.setItem('auth', JSON.stringify(response.data.auth));
                localStorage.setItem('token', JSON.stringify(response.data.token));
                localStorage.setItem('user', JSON.stringify(userData));
                navigate("/")
                window.location.reload();
            }

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

    return (
        <div className='bg-gradient-to-r from-violet-400 to-blue-800 h-screen w-full flex justify-center items-center flex-col space-y-5'>
                    <div>
                        <h1 className='text-white text-2xl max-sm:text-xl'>Acesse ao <span className='bg-gray-800 p-1 rounded-md font-bold'>MOTO<span className='text-sky-400'>SHOP</span></span></h1>
                    </div>
                <div className='bg-gray-200 w-96   rounded-md shadow-sm shadow-gray-800 max-sm:w-full m-6' >
                    <h1 className='text-center p-1 mt-1'>Não possui uma conta ? <span className="text-sky-500"><Link to="/registrar">realize o cadastro aqui !</Link></span></h1>
                    <form className='p-5 space-y-5' onSubmit={handleLogin}>
                    {Erro && 
                                <div className="text-center p-1 bg-Vermelho rounded-xl">
                                        <i class="fa-solid fa-triangle-exclamation"></i> {Erro}
                                </div>}
                        <div className='space-y-2'>
                                    <div><label htmlFor="email">E-mail:</label></div>
                                    <input type="email" name="email" id="email" className='bg-gray-800 text-gray-100 p-2 w-full rounded-2xl' placeholder='blabla@gmail.com'
                                    onChange={(e) => setEmail(e.currentTarget.value)}
                                    />
                        </div>
                        <div className='space-y-2'>
                                    <div><label htmlFor="password">Senha:</label></div>
                                    <input type="password" name="password" id="password" className='bg-gray-800 text-gray-100 p-2 w-full rounded-2xl' placeholder='***** '
                                    onChange={(e) => setPassword(e.currentTarget.value)} 
                                    />
                        </div>
                        
                    
                            <div>
                                <button className='bg-amber-400 p-2 w-full rounded-lg font-bold hover:bg-amber-300 transition-all disabled:bg-gray-400 disabled:cursor-wait' disabled={loading}>
                                    {loading ? 'Logando...' : 'Entrar'}
                                </button>
                            </div>
                    </form>
                </div>
        </div>
    );
}
