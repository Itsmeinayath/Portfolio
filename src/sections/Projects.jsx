import { useState, useEffect } from 'react';
import { myProjects } from '../constants/index.js';

const DeploymentTerminal = ({ project }) => {
    const [logIndex, setLogIndex] = useState(0);
    const logs = [
        `$ deploy ${project.title.toLowerCase().replace(/\s+/g, '-')}`,
        "> Checking dependencies... [████████████]",
        "> Running...",
        "> Container started. Listening on port 443...",
        "> Deployment Successful."
    ];

    useEffect(() => {
        // Simple interval to reveal logs sequentially
        const interval = setInterval(() => {
            setLogIndex(prev => Math.min(prev + 1, logs.length - 1));
        }, 250);
        return () => clearInterval(interval);
    }, [project]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 absolute inset-0 z-50 bg-[#0a0a0a]">
            <div className="w-full max-w-lg bg-[#050505] rounded-xl border border-white/10 p-6 font-mono text-sm shadow-2xl">
                <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    <span className="text-zinc-600 text-xs ml-2">bash - deployment</span>
                </div>
                {logs.slice(0, logIndex + 1).map((log, i) => (
                    <p key={i} className={`mb-2 ${i === 0 ? 'text-emerald-400' : 'text-zinc-400'} ${i === logs.length - 1 ? 'text-emerald-500' : ''}`}>
                        {log}
                    </p>
                ))}
                {logIndex < logs.length - 1 && <p className="animate-pulse text-zinc-500">_</p>}
            </div>
        </div>
    );
};

const Projects = () => {
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
    const [isDeploying, setIsDeploying] = useState(false);
    const currentProject = myProjects[selectedProjectIndex];

    const handleProjectChange = (index) => {
        if (index === selectedProjectIndex) return;
        setIsDeploying(true);
        setSelectedProjectIndex(index);
        setTimeout(() => {
            setIsDeploying(false);
        }, 1500); // Animation duration
    };

    return (
        <section id="work" className="c-space my-20">
            <div className="flex flex-col gap-2 mb-10">
                <p className="font-mono text-emerald-400 text-sm tracking-widest uppercase">~/portfolio/deployments</p>
                <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tighter">Engineering Case Studies</h2>
            </div>

            <div className="grid lg:grid-cols-12 grid-cols-1 gap-6 w-full items-start">
                {/* Left Panel: Terminal/Console Style Project List */}
                <div className="lg:col-span-4 bg-[#050505] border border-white/10 rounded-xl overflow-hidden flex flex-col shadow-2xl sticky top-24 z-20">
                    <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2 flex-shrink-0">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                        <p className="ml-2 font-mono text-xs text-zinc-500">bash - select_case_study.sh</p>
                    </div>
                    
                    <div className="p-4 flex flex-col gap-2">
                        {myProjects.map((project, index) => (
                            <button 
                                key={index}
                                onClick={() => handleProjectChange(index)}
                                className={`text-left font-mono px-4 py-4 rounded-lg transition-all duration-300 ${selectedProjectIndex === index ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border border-transparent'}`}
                            >
                                <span className="opacity-50 mr-3">{index + 1 > 9 ? index + 1 : `0${index + 1}`}</span>
                                {project.title.split(' - ')[0]}
                            </button>
                        ))}
                    </div>
                        
                    {/* Terminal output simulation */}
                    <div className="px-4 pb-6 mt-4 font-mono text-xs text-zinc-600 border-t border-white/5 pt-4 flex flex-col gap-2">
                        <p className="text-emerald-500/50">&gt; Loading configuration...</p>
                        <p>&gt; Target: <span className="text-zinc-400">{currentProject.title}</span></p>
                        <p>&gt; Status: <span className="text-emerald-500">200 OK - Deployed</span></p>
                        <p className="animate-pulse">_</p>
                    </div>
                </div>

                {/* Right Panel: Project Details and Video */}
                <div className="lg:col-span-8 bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden flex flex-col relative shadow-2xl min-h-[800px]">
                    {/* Glassmorphism Background elements */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none" />
                    
                    {isDeploying && <DeploymentTerminal project={currentProject} />}

                    <div className={`p-6 sm:p-10 flex-1 flex flex-col relative z-10 transition-opacity duration-500 ${isDeploying ? 'opacity-0' : 'opacity-100'}`}>
                        {/* Header */}
                        <div className="mb-6">
                            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">{currentProject.title}</h3>
                            <p className="text-emerald-400 text-sm font-mono">{currentProject.subtitle}</p>
                        </div>

                        {/* Problem & Solution */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-white/10">
                            <div>
                                <h4 className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-3">Problem</h4>
                                <p className="text-zinc-300 text-sm leading-relaxed">{currentProject.problem}</p>
                            </div>
                            <div>
                                <h4 className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-3">Solution</h4>
                                <p className="text-zinc-300 text-sm leading-relaxed">{currentProject.solution}</p>
                            </div>
                        </div>

                        {/* Engineering & Architecture */}
                        <div className="mb-8">
                            <h4 className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-4">Engineering</h4>
                            <ul className="space-y-3 mb-8">
                                {currentProject.engineering?.map((item, idx) => (
                                    <li key={idx} className="flex items-start text-sm text-zinc-300">
                                        <span className="text-emerald-500 mr-3 mt-1 text-xs">▹</span>
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            
                            {/* Architecture Flow */}
                            <h4 className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-3">Architecture Flow</h4>
                            <div className="bg-white/5 p-4 rounded-lg border border-white/5 font-mono text-xs flex items-center overflow-x-auto whitespace-nowrap scrollbar-hide">
                                {currentProject.architecture?.split('→').map((node, i, arr) => (
                                    <span key={i} className="flex items-center">
                                        <span className="text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">{node.trim()}</span>
                                        {i < arr.length - 1 && <span className="text-zinc-600 mx-3">→</span>}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Impact */}
                        <div className="mb-8 pb-8 border-b border-white/10">
                            <h4 className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-3">Impact</h4>
                            <p className="text-zinc-300 text-sm leading-relaxed">{currentProject.impact}</p>
                        </div>


                        
                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 mt-auto">
                            {currentProject.links?.live && (
                                <a href={currentProject.links.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-6 py-3 rounded-lg font-mono text-sm hover:bg-emerald-500/20 transition-colors">
                                    [ Demo ]
                                </a>
                            )}
                            {currentProject.links?.source && (
                                <a href={currentProject.links.source} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white/5 text-zinc-300 border border-white/10 px-6 py-3 rounded-lg font-mono text-sm hover:bg-white/10 transition-colors">
                                    [ Source ]
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;