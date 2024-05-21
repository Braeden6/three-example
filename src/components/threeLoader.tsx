'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TextureLoader } from 'three';
import { OrbitControls } from "@react-three/drei"

interface ModelViewerProps {
  showMoon: boolean;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({ showMoon }) => {
  return (
    <Canvas style={{ height: '100vh', width: '100vw' }} camera={{ position: [0, 0, 10], fov: 50 }}>
      <EthereumModel showMoon={showMoon} />
    </Canvas>
  );
};

export const EthereumModel: React.FC<ModelViewerProps> = ({ showMoon }) => {
  const myModel = useLoader(GLTFLoader, '/earth_cycles_v2.glb');
  const colorMap = useLoader(TextureLoader, '/earth_col_8k.jpg');
  const moonColorMap = useLoader(TextureLoader, '/moon_4k_bump.jpg');
  const sunColorMap = useLoader(TextureLoader, '/sun.jpg');
  const marsColorMap = useLoader(TextureLoader, '/mars.jpg');
  const modelRef = useRef<Mesh>(null);
  const systemRef = useRef<Mesh>(null);

  // Note: slow rotation
  useFrame((_state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta / 3;
    }
  });

  useFrame((_state, delta) => {
    if (systemRef.current) {
      systemRef.current.rotation.y += delta / 10;
    }
  });
// {/* <primitive object={myModel.scene}/> */}
  return (
    <>
    <mesh ref={systemRef}>
      <ambientLight intensity={0.2} />
      <pointLight position={[-10, -10, -10]} color="#ffffff" intensity={1000} />
      <pointLight position={[10, 10, 10]} color="#ffffff" intensity={1000} />
      <directionalLight />
      <OrbitControls />
      <mesh ref={modelRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={colorMap} />
      </mesh>
      {showMoon && (
      <mesh position={[-6, 3, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={moonColorMap} />
      </mesh>
      )}
    </mesh>
        <mesh position={[6, 2, 0]}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial map={sunColorMap} />
        </mesh>
        <mesh position={[6, 0, 0]}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial map={marsColorMap} />
        </mesh>
    </>
    
  );
};

