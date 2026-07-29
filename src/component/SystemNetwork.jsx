import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

const Packets = ({ vectors, radius }) => {
    const paths = useMemo(() => {
        const p = [];
        for (let i = 0; i < vectors.length; i++) {
            for (let j = i + 1; j < vectors.length; j++) {
                if (vectors[i].distanceTo(vectors[j]) < radius * 0.55) {
                    p.push({ start: vectors[i], end: vectors[j] });
                }
            }
        }
        return p;
    }, [vectors, radius]);

    const packetCount = 40;
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

    useFrame((state, delta) => {
        if (!meshRef.current || paths.length === 0) return;
        
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
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial color="#10b981" toneMapped={false} />
        </instancedMesh>
    );
};

const SystemNetwork = ({ count = 70, radius = 9, ...props }) => {
    const group = useRef();

    const { positions, connections, vectors } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const vectors = [];
        
        for (let i = 0; i < count; i++) {
            const u = Math.random();
            const v = Math.random();
            const theta = u * 2.0 * Math.PI;
            const phi = Math.acos(2.0 * v - 1.0);
            const r = Math.cbrt(Math.random()) * radius;
            
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
            
            vectors.push(new THREE.Vector3(x, y, z));
        }

        const connectionPositions = [];
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dist = vectors[i].distanceTo(vectors[j]);
                if (dist < radius * 0.55) { 
                    connectionPositions.push(
                        vectors[i].x, vectors[i].y, vectors[i].z,
                        vectors[j].x, vectors[j].y, vectors[j].z
                    );
                }
            }
        }
        
        return { positions, connections: new Float32Array(connectionPositions), vectors };
    }, [count, radius]);

    useFrame((state, delta) => {
        if (group.current) {
            group.current.rotation.y += delta * 0.03;
            group.current.rotation.x += delta * 0.01;
        }
    });

    return (
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
            <group ref={group} {...props}>
                <points>
                    <bufferGeometry>
                        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
                    </bufferGeometry>
                    <pointsMaterial size={0.12} color="#10b981" transparent opacity={0.9} sizeAttenuation />
                </points>
                
                <lineSegments>
                    <bufferGeometry>
                        <bufferAttribute attach="attributes-position" count={connections.length / 3} array={connections} itemSize={3} />
                    </bufferGeometry>
                    <lineBasicMaterial color="#334155" transparent opacity={0.4} />
                </lineSegments>

                <Packets vectors={vectors} radius={radius} />
            </group>
        </Float>
    );
};

export default SystemNetwork;
