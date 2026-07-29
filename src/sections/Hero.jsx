import { Suspense } from 'react'
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import CanvasLoader from "../component/CanvasLoader.jsx";
import SystemNetwork from "../component/SystemNetwork.jsx";

const Hero = () => {
    return (
        <section id="home" className="min-h-screen w-full flex flex-col relative bg-[#050505] overflow-hidden">
            
            {/* Background Noise Texture */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
            />

            {/* 3D Canvas Layer - Network is big and in the center */}
            <div className="w-full h-full absolute inset-0 z-10 pointer-events-auto">
                <Canvas className="w-full h-full">
                    <Suspense fallback={<CanvasLoader />}>
                        <PerspectiveCamera makeDefault position={[0, 0, 24]} fov={60} />
                        
                        {/* Much larger network in the center */}
                        <SystemNetwork position={[0, -2, 0]} radius={14} count={90} />
                        
                        {/* Lighting */}
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 10]} intensity={2} color="#10b981" />
                        <directionalLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
                        
                        <OrbitControls 
                            enableZoom={false} 
                            enablePan={false} 
                            autoRotate 
                            autoRotateSpeed={0.3} 
                            maxPolarAngle={Math.PI / 2 + 0.3} 
                            minPolarAngle={Math.PI / 2 - 0.3} 
                        />
                    </Suspense>
                </Canvas>
            </div>

            {/* Subtle radial gradient to separate text from the 3D network lines */}
            <div className="absolute inset-0 z-15 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#050505]/90 via-[#050505]/40 to-transparent" />

            {/* Content Layer - Centered */}
            <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full z-20 pointer-events-none absolute inset-0 px-6 sm:px-10">
                
                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-[11px] font-medium text-zinc-300 font-mono tracking-widest uppercase backdrop-blur-xl shadow-2xl mb-8">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    System Online
                </div>

                <h1 className="text-6xl sm:text-8xl font-bold text-white tracking-tighter text-center leading-[1.1] drop-shadow-2xl">
                    I build systems.
                </h1>
                
                <p className="text-zinc-400 text-lg sm:text-xl font-mono leading-relaxed text-center max-w-2xl mt-6 drop-shadow-xl">
                    I teach them. I break them. I understand how they work. <br />
                    <span className="text-emerald-400 font-semibold mt-2 block">Full Stack & Systems Engineer.</span>
                </p>

                {/* Minimalist, subtle premium button */}
                <a href="#work" className="mt-12 pointer-events-auto flex items-center gap-2 px-8 py-4 border border-white/10 rounded-full bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all font-mono text-zinc-300 hover:text-white text-sm backdrop-blur-xl shadow-2xl">
                    Explore Architecture
                    <span className="ml-2 text-emerald-400">↓</span>
                </a>
            </div>
            
            {/* Fade out bottom edge */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" />
        </section>
    )
}

export default Hero
