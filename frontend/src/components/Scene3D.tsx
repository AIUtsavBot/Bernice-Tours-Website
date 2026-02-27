'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

function GlobeObject() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.002;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} position={[3, 0, 0]} scale={2}>
                <sphereGeometry args={[1, 64, 64]} />
                <MeshDistortMaterial
                    color="#c9a227"
                    attach="material"
                    distort={0.3}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>
        </Float>
    );
}

function PassportObject() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh ref={meshRef} position={[-3, 1, -2]}>
                <boxGeometry args={[1.2, 1.6, 0.15]} />
                <meshStandardMaterial
                    color="#1a365d"
                    roughness={0.3}
                    metalness={0.5}
                />
            </mesh>
        </Float>
    );
}

function PlaneObject() {
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 2;
            meshRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.5) * 0.5 + 2;
            meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
        }
    });

    return (
        <group ref={meshRef} position={[0, 2, -3]}>
            {/* Fuselage */}
            <mesh>
                <capsuleGeometry args={[0.15, 0.8, 4, 16]} />
                <meshStandardMaterial color="#e8c547" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Wings */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <boxGeometry args={[0.05, 1.2, 0.3]} />
                <meshStandardMaterial color="#c9a227" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Tail */}
            <mesh position={[0, 0.5, 0]} rotation={[0, 0, 0]}>
                <boxGeometry args={[0.3, 0.2, 0.05]} />
                <meshStandardMaterial color="#c9a227" metalness={0.8} roughness={0.2} />
            </mesh>
        </group>
    );
}

function FloatingParticles() {
    const particlesRef = useRef<THREE.Points>(null);

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(200 * 3);
        for (let i = 0; i < 200; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return positions;
    }, []);

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
            particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particlesPosition, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#c9a227"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

function OrbitRings() {
    const ring1Ref = useRef<THREE.Mesh>(null);
    const ring2Ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (ring1Ref.current) {
            ring1Ref.current.rotation.x = state.clock.elapsedTime * 0.1;
            ring1Ref.current.rotation.z = state.clock.elapsedTime * 0.05;
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.x = -state.clock.elapsedTime * 0.08;
            ring2Ref.current.rotation.y = state.clock.elapsedTime * 0.06;
        }
    });

    return (
        <>
            <mesh ref={ring1Ref} position={[3, 0, 0]}>
                <torusGeometry args={[3, 0.02, 16, 100]} />
                <meshStandardMaterial color="#c9a227" transparent opacity={0.4} />
            </mesh>
            <mesh ref={ring2Ref} position={[3, 0, 0]} rotation={[Math.PI / 3, 0, 0]}>
                <torusGeometry args={[2.5, 0.015, 16, 100]} />
                <meshStandardMaterial color="#e8c547" transparent opacity={0.3} />
            </mesh>
        </>
    );
}

export default function Scene3D() {
    return (
        <div className="canvas-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <Canvas
                camera={{ position: [0, 0, 10], fov: 45 }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -5]} intensity={0.5} color="#c9a227" />
                <pointLight position={[10, 10, 10]} intensity={0.3} color="#e8c547" />

                <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />

                <GlobeObject />
                <PassportObject />
                <PlaneObject />
                <FloatingParticles />
                <OrbitRings />
            </Canvas>
        </div>
    );
}
