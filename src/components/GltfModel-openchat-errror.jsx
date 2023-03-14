import React, { useRef, useMemo, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

function Mesh({ modelPath, gltf, scale, onPointerOver, onPointerOut }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  const { nodes, materials } = useGLTF(modelPath)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  const nodesArray = Object.values(nodes);

  return (
    <group>
      {nodesArray.map((node, index) => (
        <mesh
          key={index}
          geometry={node.geometry}
          material={materials.material02}
          scale={hovered ? scale * 1.15 : scale}
        />
      ))}
    </group>
  );
}

export default function GltfModel({ modelPath, scale = 40, position = [0, 0, 0] }) {
  const draco = useMemo(() => {
    const draco = new DRACOLoader();
    draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    draco.setDecoderConfig({ type: 'js' }); // optional for some browsers
    return draco;
  }, []);

  const gltf = useGLTF(modelPath, draco);

  return (
    <group position={position}>
      <Mesh modelPath={modelPath} gltf={gltf} scale={scale} />
    </group>
  );
}
