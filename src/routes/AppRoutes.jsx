import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import LoginPage from "../pages/login"
import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard"
import MyMotos from "../pages/MyMotos"
import Motos from "../pages/Motos"
import AlugarMoto from "../pages/alugarMoto"
import SearchPage from "../pages/SearchPage"

export default function AppRoutes(){

    const isAuthenticated = () => { //função para verificar se o usuario tem que ta logado para acssar tal página
        const token = localStorage.getItem('token');
        return token !== null
    }

    return (
        <>       
            <BrowserRouter>
                <Routes>
                        <Route path="/login" 
                        element={isAuthenticated() ? <Navigate to="/" /> : <LoginPage /> } 
                        
                        />
                        <Route path="/registrar" 
                        element={isAuthenticated() ? <Navigate to="/" /> : <Register />}   
                        />
                        <Route path="/" element={<Dashboard />}  />
                        <Route path="/buscar/:search" element={<SearchPage />}  />

                        <Route path="/minhasmotos" 
                        element={!isAuthenticated() ? <Navigate to="/login" /> : <MyMotos />} 
                        />
                          <Route path="/motos" 
                        element={!isAuthenticated() ? <Navigate to="/login" /> : <Motos />} 
                        />
                         <Route path="/alugar/:id" 
                        element={!isAuthenticated() ? <Navigate to="/login" /> : <AlugarMoto  />} 
                        />

                        
                </Routes>
            </BrowserRouter>
        </>
    )


}