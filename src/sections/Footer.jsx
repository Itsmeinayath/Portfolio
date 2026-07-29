const Footer = () => {
    return (
        <section className="c-space pt-7 pb-10 border-t border-white/10 flex justify-between items-center flex-wrap gap-5">
            <div className="font-mono text-xs text-zinc-500 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <p>SYSTEM.STATUS: ONLINE</p>
                <span className="mx-2 opacity-30">|</span>
                <p>PORT: 443</p>
            </div>
            
            <div className="flex gap-3">
                <a 
                    href="https://github.com/Itsmeinayath" 
                    rel="noopener noreferrer" 
                    target="_blank"
                    className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all group"
                >
                    <img src="/assets/github.svg" alt="github" className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
                <a 
                    href="https://www.linkedin.com/in/its-me-mohammed-inayath" 
                    rel="noopener noreferrer" 
                    target="_blank"
                    className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg hover:bg-blue-500/10 hover:border-blue-500/30 transition-all group"
                >
                    <img src="/assets/linkedin.svg" alt="linkedin" className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
            </div>

            <p className="font-mono text-xs text-zinc-600">© 2026 Mohammed Inayath. [ EOF ]</p>
        </section>
    )
}
export default Footer
