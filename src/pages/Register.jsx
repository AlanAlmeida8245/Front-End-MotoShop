import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios"
import {useNavigate} from "react-router-dom"

export default function Register() {

    const [name, setName] = useState("")
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")

    const [Loading, setLoading] = useState(false) // stado para armazenar quando deve ser enviado novamentde
    const [Erro, setErro] = useState(null)
    const [successMsg, setSuccessMsg] = useState(null)

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const dados = {
                nome: name,
                email: email,
                senha: password,
                confirmarsenha: confirmpassword
            };
            
            const response = await axios.post("https://back-end-bike-shop.vercel.app/cadastrar", dados);
    
            // Verifica se a resposta tem uma propriedade 'data' e 'erro'
            if (response.data && response.data.erro) {
                setErro(response.data.erro);
            } else {
                // Aqui você pode acessar os dados retornados pela requisição de sucesso
                console.log("Dados recebidos:", response.data);
                setSuccessMsg("Conta criada com sucesso!");
                setErro(null)
                setTimeout(() => {
                    navigate("/login")
                }, 1000)
            
            }
        } catch (error) {
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
                        <h1 className='text-white text-2xl max-sm:text-lg'>Cadastre-se na <span className='bg-gray-800 p-1 rounded-md font-bold'>MOTO<span className='text-cyan-400'>SHOP</span></span></h1>
                    </div>
                <div className='bg-gray-200 w-96  rounded-md shadow-sm shadow-gray-800 max-sm:w-full m-6'>
                    <h1 className='text-center p-1 mt-1'>Já possui uma conta ? <span className="text-sky-500"><Link to="/login">Faça o Login aqui</Link></span></h1>
                    <form className='p-5 space-y-5' onSubmit={handleRegister}>
                    {successMsg && 
                                <div className="text-center p-1 bg-emerald-400 rounded-xl">
                                        <i class="fa-solid fa-triangle-exclamation"></i> {successMsg}
                                </div>}
                        <div className='space-y-2'>
                                    <div><label htmlFor="name">Nome:</label></div>
                                    <input type="text" name="name" id="name" className='bg-gray-800 text-gray-100 p-2 w-full rounded-2xl' placeholder='Nome de Usuario'
                                    onChange={(e) => setName(e.currentTarget.value)}
                                    />
                        </div>
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
                        <div className='space-y-2'>
                                    <div><label htmlFor="confirmpasswrd">Confirmar Senha:</label></div>
                                    <input type="password" name="confirmpasswrd" id="confirmpassword" className='bg-gray-800 text-gray-100 p-2 w-full  rounded-2xl' placeholder='******'
                                      onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                                    />
                        </div>
                    
                            <div>
                                <button className='bg-amber-400 p-2 w-full rounded-lg font-bold hover:bg-amber-300 transition-all disabled:bg-gray-400 disabled:cursor-wait' disabled={Loading}>
                                    {Loading ? 'Cadastrando...' : 'Cadastrar-se'}
                                </button>
                            </div>
                                {Erro && 
                                <div className="text-center p-1 bg-Vermelho rounded-xl">
                                        <i class="fa-solid fa-triangle-exclamation"></i> {Erro}
                                </div>}
                    </form>
                   
                </div>
        </div>
    );
}
