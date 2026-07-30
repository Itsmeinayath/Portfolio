import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

const Packets = ({ vectors, radius }) => {
    const paths = useMemo(() => {
        const p = [];
        for (let i = 0; i < vectors.length; i++) {
            for (let j = i + 1; j < vectors.length; j++) {
                // Keep packet paths matching the new lower density connection distance
                if (vectors[i].distanceTo(vectors[j]) < radius * 0.35) {
                    p.push({ start: vectors[i], end: vectors[j] });
                }
            }
        }
        return p;
    }, [vectors, radius]);

    const packetCount = 15; 
    const meshRef = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);
    
    const packetData = useMemo(() => {
        if (paths.length === 0) return [];
        return new Array(packetCount).fill(0).map(() => {
            const path = paths[Math.floor(Math.random() * paths.length)];
            return {
                path,
                progress: Math.random(),
                speed: 0.15 + Math.random() * 0.2,
            }
        });
    }, [paths]);

    const timeRef = useRef(0);

    useFrame((state, delta) => {
        timeRef.current += delta;
        if (!meshRef.current || paths.length === 0) return;
        
        const opacity = Math.max(0, Math.min(1, (timeRef.current - 2.0) / 1.0));
        meshRef.current.material.opacity = opacity * 0.9;
        
        packetData.forEach((data, i) => {
            data.progress += delta * data.speed;
            if (data.progress > 1) {
                data.progress = 0;
                data.path = paths[Math.floor(Math.random() * paths.length)];
            }
            
            const pos = new THREE.Vector3().lerpVectors(data.path.start, data.path.end, data.progress);
            dummy.position.copy(pos);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    if (paths.length === 0) return null;

    return (
        <instancedMesh ref={meshRef} args={[null, null, packetCount]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color="#ffffff" toneMapped={false} transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
        </instancedMesh>
    );
};

// Reduced count from 75 to 55, increased radius from 18 to 22 to spread them out and reduce center density
const SystemNetwork = ({ count = 55, radius = 22, ...props }) => {
    const group = useRef();
    const linesGeoRef = useRef();
    const pointsGeoRef = useRef();

    const { positions, connections, vectors } = useMemo(() => {
        const positions = [];
        const vectors = [];
        
        for (let i = 0; i < count; i++) {
            const u = Math.random();
            const v = Math.random();
            const theta = u * 2.0 * Math.PI;
            const phi = Math.acos(2.0 * v - 1.0);
            
            // Push nodes slightly further towards the edges of the sphere, avoiding the exact dead center
            const r = (0.3 + 0.7 * Math.cbrt(Math.random())) * radius;
            
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            
            positions.push(x, y, z);
            vectors.push(new THREE.Vector3(x, y, z));
        }

        const connectionPositions = [];
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dist = vectors[i].distanceTo(vectors[j]);
                // Reduced connection distance from 0.55 to 0.35 to drastically reduce line density (no more spiderweb)
                if (dist < radius * 0.35) { 
                    connectionPositions.push(
                        vectors[i].x, vectors[i].y, vectors[i].z,
                        vectors[j].x, vectors[j].y, vectors[j].z
                    );
                }
            }
        }
        
        return { 
            positions: new Float32Array(positions), 
            connections: new Float32Array(connectionPositions), 
            vectors 
        };
    }, [count, radius]);

    const baseRotation = useRef({ x: 0, y: 0 });
    const timeRef = useRef(0);
    const buildTime = 3.5; 

    useFrame((state, delta) => {
        timeRef.current += delta;
        const progress = Math.min(timeRef.current / buildTime, 1.0);
        const ease = 1 - Math.pow(1 - progress, 4);
        
        if (linesGeoRef.current) linesGeoRef.current.setDrawRange(0, Math.floor((connections.length / 3) * ease) * 3);
        if (pointsGeoRef.current) pointsGeoRef.current.setDrawRange(0, Math.floor((positions.length / 3) * ease));

        if (group.current) {
            // Subtle scale-in animation (starts small, grows to full size)
            const scale = 0.5 + (0.5 * ease);
            group.current.scale.setScalar(scale);

            baseRotation.current.y += delta * 0.003;
            baseRotation.current.x += delta * 0.001;
            
            const mouseOffsetX = (state.pointer.y * Math.PI) / 16;
            const mouseOffsetY = (state.pointer.x * Math.PI) / 16;
            
            const targetX = baseRotation.current.x + mouseOffsetX;
            const targetY = baseRotation.current.y + mouseOffsetY;
            
            group.current.rotation.x += (targetX - group.current.rotation.x) * 0.03;
            group.current.rotation.y += (targetY - group.current.rotation.y) * 0.03;
        }
    });

    return (
        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
            <group ref={group} {...props}>
                <points>
                    <bufferGeometry ref={pointsGeoRef}>
                        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
                    </bufferGeometry>
                    <pointsMaterial size={0.15} color="#ffffff" transparent opacity={0.6} sizeAttenuation toneMapped={false} blending={THREE.AdditiveBlending} depthWrite={false} />
                </points>
                
                <lineSegments>
                    <bufferGeometry ref={linesGeoRef}>
                        <bufferAttribute attach="attributes-position" count={connections.length / 3} array={connections} itemSize={3} />
                    </bufferGeometry>
                    <lineBasicMaterial color="#94a3b8" transparent opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} />
                </lineSegments>

                <Packets vectors={vectors} radius={radius} />
            </group>
        </Float>
    );
};

export default SystemNetwork;
