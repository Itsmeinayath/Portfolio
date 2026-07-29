import { Suspense } from 'react'
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import CanvasLoader from "../component/CanvasLoader.jsx";
import SystemNetwork from "../component/SystemNetwork.jsx";
import Button from "../component/Button.jsx";

const Hero = () => {
    return (
        <section id="home" className="min-h-screen w-full flex flex-col relative bg-[#050505] overflow-hidden">
            
            {/* Background Noise Texture */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
            />

            {/* The Glow Orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none z-0" />

            {/* Content Layer */}
            <div className="w-full mx-auto flex flex-col sm:mt-36 mt-28 c-space gap-4 z-20 pointer-events-none absolute top-0 left-0 right-0 items-center">
                
                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-zinc-300 mb-2 font-mono backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Connection Established: port 8080
                </div>

                <h1 className="sm:text-7xl text-5xl font-bold text-white text-center tracking-tighter">
                    I build systems.
                </h1>
                
                <p className="text-zinc-400 text-center text-lg sm:text-xl max-w-2xl font-mono mt-4 leading-relaxed">
                    I teach them. I break them. I understand how they work. <br className="hidden sm:block" />
                    <span className="text-emerald-400 font-semibold">Full Stack & Systems Engineer.</span>
                </p>
            </div>

            {/* 3D Canvas Layer */}
            <div className="w-full h-full absolute inset-0 z-10">
                <Canvas className="w-full h-full">
                    <Suspense fallback={<CanvasLoader />}>
                        <PerspectiveCamera makeDefault position={[0, 0, 22]} fov={60} />
                        
                        {/* Interactive Network */}
                        <SystemNetwork position={[0, -2, 0]} />
                        
                        {/* Lighting */}
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 10]} intensity={2} color="#10b981" />
                        <directionalLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
                        
                        <OrbitControls 
                            enableZoom={false} 
                            enablePan={false} 
                            autoRotate 
                            autoRotateSpeed={0.5} 
                            maxPolarAngle={Math.PI / 2 + 0.3} 
                            minPolarAngle={Math.PI / 2 - 0.3} 
                        />
                    </Suspense>
                </Canvas>
            </div>

            {/* CTA Layer */}
            <div className="absolute bottom-10 left-0 right-0 w-full z-20 c-space flex justify-center">
                <a href="#about" className="w-fit">
                    <Button name="Explore the Architecture" isBeam containerClass="sm:w-fit w-full sm:min-w-96" />
                </a>
            </div>
        </section>
    )
}

export default Hero
