import { Suspense } from 'react'
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import CanvasLoader from "../component/CanvasLoader.jsx";
import SystemNetwork from "../component/SystemNetwork.jsx";

const Hero = () => {
    return (
        <section id="home" className="min-h-screen w-full flex flex-col relative bg-[#050505] overflow-hidden">

            {/* Background Noise Texture */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* The Glow Orb - Centered for that subtle greenish background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-emerald-600/15 blur-[150px] rounded-full pointer-events-none z-0" />

            {/* 3D Canvas Layer - Network is big and in the center */}
            <div className="w-full h-full absolute inset-0 z-10 pointer-events-none sm:pointer-events-auto">
                <Canvas className="w-full h-full" style={{ touchAction: 'auto' }}>
                    <Suspense fallback={<CanvasLoader />}>
                        <PerspectiveCamera makeDefault position={[0, 0, 24]} fov={60} />

                        {/* Massive interconnected network filling the entire background */}
                        <SystemNetwork position={[0, 0, -8]} radius={45} count={140} />

                        {/* Lighting */}
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 10]} intensity={2} color="#10b981" />
                        <directionalLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
                    </Suspense>
                </Canvas>
            </div>

            {/* Subtle radial gradient to separate text from the 3D network lines - dark edges, clear center */}
            <div className="absolute inset-0 z-15 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-[#050505]/50 to-[#050505]" />

            {/* Content Layer - Centered */}
            <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full z-20 pointer-events-none absolute inset-0 px-6 sm:px-10 pt-16">

                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[11px] font-medium text-emerald-300 font-mono tracking-widest uppercase backdrop-blur-xl shadow-2xl mb-8">
                    Currently Learning: Docker • Kubernetes • AWS
                </div>

                <h1 className="text-5xl sm:text-7xl font-bold text-white tracking-tighter text-center leading-[1.1] drop-shadow-2xl">
                    Building software by <br className="hidden sm:block" /> understanding systems.
                </h1>

                <p className="text-zinc-300 text-lg sm:text-xl font-medium leading-relaxed text-center max-w-3xl mt-6 drop-shadow-xl mx-auto">
                    Building complete, end-to-end products—from intuitive interfaces to resilient cloud infrastructure. <br />
                    <span className="text-emerald-400 font-semibold mt-4 flex items-center justify-center gap-3 font-mono text-sm tracking-wide uppercase">
                        <span>Mohammed Inayath</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span>
                        <span>Software Engineer</span>
                    </span>
                </p>

                {/* Minimalist, subtle premium button */}
                <a href="#work" className="mt-12 pointer-events-auto flex items-center gap-2 px-8 py-4 border border-white/10 rounded-full bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all font-mono text-zinc-300 hover:text-white text-sm backdrop-blur-xl shadow-2xl">
                    View Projects
                    <span className="ml-2 text-emerald-400">↓</span>
                </a>
            </div>

            {/* Fade out bottom edge */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" />
        </section>
    )
}

export default Hero
