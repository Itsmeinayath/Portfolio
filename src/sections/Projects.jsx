import { useState } from 'react';
import { myProjects } from '../constants/index.js';

const Projects = () => {
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
    const currentProject = myProjects[selectedProjectIndex];

    return (
        <section id="work" className="c-space my-20">
            <div className="flex flex-col gap-2 mb-10">
                <p className="font-mono text-emerald-400 text-sm tracking-widest uppercase">~/portfolio/deployments</p>
                <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tighter">System Architecture</h2>
            </div>

            <div className="grid lg:grid-cols-12 grid-cols-1 gap-6 w-full lg:h-[600px]">
                {/* Left Panel: Terminal/Console Style Project List */}
                <div className="lg:col-span-4 bg-[#050505] border border-white/10 rounded-xl overflow-hidden flex flex-col h-full shadow-2xl">
                    <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                        <p className="ml-2 font-mono text-xs text-zinc-500">bash - select_deployment.sh</p>
                    </div>
                    
                    <div className="p-4 flex-1 overflow-y-auto">
                        <div className="flex flex-col gap-2">
                            {myProjects.map((project, index) => (
                                <button 
                                    key={index}
                                    onClick={() => setSelectedProjectIndex(index)}
                                    className={`text-left font-mono px-4 py-3 rounded-lg transition-all duration-300 ${selectedProjectIndex === index ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border border-transparent'}`}
                                >
                                    <span className="opacity-50 mr-3">{index + 1 > 9 ? index + 1 : `0${index + 1}`}</span>
                                    {project.title.split(' - ')[0]}
                                </button>
                            ))}
                        </div>
                        
                        {/* Terminal output simulation */}
                        <div className="mt-8 font-mono text-xs text-zinc-600 border-t border-white/5 pt-4 flex flex-col gap-1">
                            <p className="text-emerald-500/50">> Loading configuration...</p>
                            <p>> Target: <span className="text-zinc-400">{currentProject.title.split(' - ')[0]}</span></p>
                            <p>> Status: <span className="text-emerald-500">200 OK - Deployed</span></p>
                            <p className="animate-pulse">_</p>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Project Details and Video */}
                <div className="lg:col-span-8 bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden flex flex-col relative h-full shadow-2xl">
                    {/* Glassmorphism Background elements */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none" />
                    
                    <div className="p-6 sm:p-10 flex-1 flex flex-col relative z-10 overflow-y-auto">
                        <div className="flex flex-col mb-6 gap-2">
                            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{currentProject.title}</h3>
                        </div>
                        
                        <p className="text-zinc-400 font-mono text-sm leading-relaxed mb-4">
                            {currentProject.desc}
                        </p>
                        <p className="text-zinc-500 font-mono text-sm leading-relaxed mb-8">
                            {currentProject.subdesc}
                        </p>
                        
                        {/* Video Player styled as a clean browser window */}
                        <div className="mt-auto w-full rounded-xl overflow-hidden border border-white/10 bg-black relative group">
                            {/* Window Header */}
                            <div className="h-8 bg-[#111] border-b border-white/10 flex items-center px-4">
                                <p className="font-mono text-[10px] text-zinc-600 mx-auto">localhost:3000</p>
                            </div>
                            
                            <div className="relative">
                                <video 
                                    src={currentProject.texture} 
                                    autoPlay 
                                    loop 
                                    muted 
                                    playsInline 
                                    key={currentProject.texture} // Re-mount video on change
                                    className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                                
                                <div className="absolute bottom-6 right-6">
                                    <a href={currentProject.href} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-5 py-2.5 rounded-lg font-mono text-sm hover:bg-emerald-500/30 transition-colors backdrop-blur-md">
                                        View Live Deployment <span className="text-lg">→</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;