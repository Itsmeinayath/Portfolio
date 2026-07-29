import {useState} from 'react'
import {navLinks} from "../constants/index.js";

const NavItem = () => {
   return (
       <ul className="flex flex-col sm:flex-row items-center gap-6">
           {navLinks.map(({id, name, href}) => (
               <li key={id} className="w-full sm:w-auto">
                   <a href={href} className="block text-[13px] font-normal text-zinc-400 hover:text-white transition-all duration-300 hover:bg-white/5 px-3 py-1.5 rounded-full text-center sm:text-left" onClick={() => setIsOpen(false)}>
                       {name}
                   </a>
               </li>
           ))}
       </ul>
   )
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    
    const toggleMenu = () => setIsOpen((prevIsOpen) => !prevIsOpen)
    
    return (
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-3xl bg-transparent">
            <div className="px-5 h-12 flex items-center justify-between">
                <div className="flex items-center gap-1.5 tracking-tight">
                    <a href="/" className="font-semibold text-[15px] tracking-tight text-zinc-100 hover:text-emerald-400 transition-colors">
                        Inayath
                    </a>
                </div>
                
                <button onClick={toggleMenu}
                        className="text-zinc-400 hover:text-white focus:outline-none sm:hidden flex transition-colors"
                        aria-label="toggle menu">
                    <img src={isOpen ? "assets/close.svg" : "assets/menu.svg"} alt="toggle" className="w-5 h-5 opacity-70"/>
                </button>
                
                <nav className="sm:flex hidden">
                    <NavItem/>
                </nav>
            </div>
            
            {/* Mobile Sidebar */}
            <div className={`absolute top-16 left-0 right-0 bg-[#050505]/95 backdrop-blur-xl border border-white/10 rounded-2xl transition-all duration-300 ease-in-out overflow-hidden sm:hidden shadow-2xl ${isOpen ? 'max-h-96 opacity-100': 'max-h-0 opacity-0 border-transparent'}`}>
               <nav className="py-5 px-6">
                   <ul className="flex flex-col gap-4">
                       {navLinks.map(({id, name, href}) => (
                           <li key={id} className="w-full border-b border-white/5 pb-3 last:border-0 last:pb-0">
                               <a href={href} onClick={() => setIsOpen(false)} className="block text-sm text-zinc-400 hover:text-white transition-colors font-mono tracking-widest uppercase text-center" >
                                   {name}
                               </a>
                           </li>
                       ))}
                   </ul>
               </nav>
            </div>
        </header>
    )
}

export default Navbar
