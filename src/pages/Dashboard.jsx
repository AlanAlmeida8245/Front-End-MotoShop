import Header from "../components/Header/Header"
import Navbar from "../components/Navbar/Navbar"
import  Moto  from "../assets/moto-header.webp" 
import Biz from "../assets/Biz.webp"
import Footer from "../components/Footer/Footer"

export default function Dashboard() {

        
    return (
        <div>
            <Navbar/>
            <Header />
                <section className="w-full mb-6 space-y-2">
                        <div className="flex justify-evenly items-center max-sm:block max-sm:justify-center max-sm: m-5">
                                <div>
                                        <img src={Moto} alt="sla" className="w-96 max-sm:w-44" />
                                </div>
                                <div className="space-y-2">
                                    <h1 className="text-2xl  rounded-md  w-72 font-bold">Motos estilosas para você</h1> 
                                    <p>Motos potentes e bonitas com os melhores lançamentos </p>
                                    <button className="bg-gray-800 p-1 text-white rounded-md w-48 max-sm:w-28 max-sm:text-sm">Confira</button>
                               
                                </div>
                        </div>

                        <div className="flex justify-evenly items-center flex-row-reverse max-sm:block max-sm:m-5">
                                <div>
                                        <img src={ Biz } alt="sla" className="w-96 max-sm:w-44"/>
                                </div>
                                <div className="space-y-2 ">
                                    <h1 className="text-2xl  rounded-md  w-72 font-bold max-sm:text-xl">Acessiveis que cabe no seu Bolso</h1> 
                                    <p>Aqule preçinho garantido para você </p>
                                    <button className="bg-sky-400 hover:bg-sky-500 transition-all p-1 text-white rounded-md w-48 max-sm:w-24 max-sm:text-md">Confira</button>
                                </div>
                        </div>
                </section>
                <Footer />
        </div>
    )
}