import { useState, useEffect } from 'react';

const PhotoProgression = () => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <div 
            className="relative w-full aspect-square bg-[#050505] overflow-hidden rounded-lg border border-white/10 cursor-pointer group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Real Image */}
            <img 
                src="assets/inayath2.png" 
                alt="Mohammed Inayath" 
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 z-10 
                ${!isHovering ? 'opacity-100' : 'opacity-0'}`} 
            />

            {/* Pixelated Image + Floating Logos */}
            <div className={`absolute inset-0 z-20 transition-opacity duration-500 flex items-center justify-center bg-[#050505] ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                <img 
                    src="assets/inayath2.png" 
                    className="w-full h-full object-contain filter contrast-150 grayscale blur-[3px]"
                    style={{ imageRendering: 'pixelated', transform: 'scale(1.05)' }} 
                />
                
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_8px] mix-blend-overlay pointer-events-none"></div>
            </div>
            
            {/* Overlay hint */}
            <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-[10px] tracking-[0.2em] font-mono text-zinc-400 transition-all duration-500 ${isHovering ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'} z-50 shadow-lg pointer-events-none`}>
                HOVER TO DECRYPT
            </div>
        </div>
    );
};

const DynamicStatus = () => {
    const [status, setStatus] = useState("Compiling...");
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setStatus("Running...");
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <span className="text-emerald-400 animate-pulse flex items-center gap-2">
            {status === "Running..." && <span className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_#34d399]"></span>}
            {status}
        </span>
    );
};

const About = () => {
    const [hasCopied, setHasCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('itsmemohammedinayath@gmail.com');
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
    };

    return (
        <section className="c-space pt-32 pb-20 relative z-20" id="about">
            {/* Main OS Terminal Window */}
            <div className="max-w-6xl mx-auto w-full bg-[#050505]/60 backdrop-blur-3xl rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col font-mono">
                
                {/* Terminal Header */}
                <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="text-zinc-400 text-xs tracking-widest">SYSTEM_INSPECTION: MOHAMMED_INAYATH.SYS</div>
                    <div className="w-16"></div> {/* Spacer for centering */}
                </div>

                {/* OS Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/5">
                    
                    {/* LEFT COLUMN: Profile Data */}
                    <div className="lg:col-span-4 bg-[#050505]/80 p-6 flex flex-col gap-8">
                        
                        <PhotoProgression />

                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span className="text-zinc-500">NAME</span>
                                <span className="text-zinc-300">Mohammed Inayath</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span className="text-zinc-500">ROLE</span>
                                <span className="text-zinc-300 text-right">Lecturer<br/><span className="text-xs text-zinc-500">Full Stack Development</span></span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span className="text-zinc-500">STATUS</span>
                                <DynamicStatus />
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span className="text-zinc-500">MISSION</span>
                                <span className="text-zinc-300 text-right">Build software by<br/>understanding systems.</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span className="text-zinc-500">FOCUS</span>
                                <span className="text-zinc-300">Infrastructure & Backend</span>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: Logs & Stack */}
                    <div className="lg:col-span-8 bg-[#050505]/80 p-6 flex flex-col gap-10">
                        
                        {/* 1. The Real Story Log */}
                        <div className="space-y-4">
                            <div className="text-zinc-500 text-xs mb-2">~system_logs $ journalctl --user --unit=journey.service</div>
                            <div className="font-mono text-sm leading-7 text-zinc-300 bg-white/[0.02] p-5 rounded-lg border border-white/5 relative">
                                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/30 rounded-l-lg"></div>
                                <p><span className="text-zinc-500 mr-3">INFO</span> Teaching Full Stack Development to students.</p>
                                <p><span className="text-zinc-500 mr-3">INFO</span> Architecting portfolio & writing code.</p>
                                <p><span className="text-zinc-500 mr-3">INFO</span> Learning Docker & Kubernetes infrastructure.</p>
                                <p><span className="text-zinc-500 mr-3">INFO</span> Looking for Software Engineering opportunities.</p>
                            </div>
                        </div>

                        {/* 2. Server Log Tech Stack (systemctl) */}
                        <div className="space-y-4">
                            <div className="text-zinc-500 text-xs mb-2 flex items-center justify-between">
                                <span>~system_core $ systemctl list-units --type=service</span>
                                <span className="text-emerald-400 text-[10px] animate-pulse">● LIVE</span>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-sm font-mono">
                                    <thead>
                                        <tr className="border-b border-white/10 text-zinc-500 text-xs">
                                            <th className="py-2 px-2 font-normal">UNIT</th>
                                            <th className="py-2 px-2 font-normal">STATE</th>
                                            <th className="py-2 px-2 font-normal">DOMAIN</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-zinc-300">
                                        <tr className="hover:bg-white/5 transition-colors border-b border-white/5">
                                            <td className="py-2 px-2 text-zinc-200">linux.service</td>
                                            <td className="py-2 px-2 text-emerald-400">active (running)</td>
                                            <td className="py-2 px-2 text-zinc-500">Operating System</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors border-b border-white/5">
                                            <td className="py-2 px-2 text-blue-400">node.service</td>
                                            <td className="py-2 px-2 text-emerald-400">active (running)</td>
                                            <td className="py-2 px-2 text-zinc-500">Backend</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors border-b border-white/5">
                                            <td className="py-2 px-2 text-cyan-400">react.service</td>
                                            <td className="py-2 px-2 text-emerald-400">active (running)</td>
                                            <td className="py-2 px-2 text-zinc-500">Frontend</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors border-b border-white/5">
                                            <td className="py-2 px-2 text-emerald-400">postgres.service</td>
                                            <td className="py-2 px-2 text-emerald-400">active (running)</td>
                                            <td className="py-2 px-2 text-zinc-500">Database</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors border-b border-white/5">
                                            <td className="py-2 px-2 text-blue-500">docker.service</td>
                                            <td className="py-2 px-2 text-emerald-400">active (running)</td>
                                            <td className="py-2 px-2 text-zinc-500">Containers</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors border-b border-white/5">
                                            <td className="py-2 px-2 text-yellow-400">python.service</td>
                                            <td className="py-2 px-2 text-emerald-400">active (running)</td>
                                            <td className="py-2 px-2 text-zinc-500">Language</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors border-b border-white/5">
                                            <td className="py-2 px-2 text-purple-400">kubernetes.service</td>
                                            <td className="py-2 px-2 text-yellow-400 animate-pulse">activating (learning)</td>
                                            <td className="py-2 px-2 text-zinc-500">Orchestration</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="py-2 px-2 text-orange-400">aws.service</td>
                                            <td className="py-2 px-2 text-zinc-600">waiting (queued)</td>
                                            <td className="py-2 px-2 text-zinc-500">Cloud Infrastructure</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 3. Terminal Contact */}
                        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                            <div className="text-zinc-500 text-xs">~network $ ping inayath</div>
                            <button 
                                onClick={handleCopy}
                                className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-md transition-all active:scale-95"
                            >
                                <span className="text-emerald-400">{hasCopied ? 'COPIED' : 'EXECUTE: mailto'}</span>
                                <span className="text-zinc-300 group-hover:text-white transition-colors">itsmemohammedinayath@gmail.com</span>
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;