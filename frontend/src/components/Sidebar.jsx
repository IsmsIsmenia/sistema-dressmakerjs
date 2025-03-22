import logo from "../assets/logo_sem_fundo.png";
import { Mail, Lock, ChevronFirst } from "lucide-react";

export default function Sidebar({}){
    return (
        <aside className="h-screen">
            <nav className=" h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                <img src={logo} className="w-32" alt="Logo" />
               <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                    <ChevronFirst/>
               </button>
                </div>
            </nav>

        </aside>
    )
}