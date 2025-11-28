// src/components/EarthScene.tsx
'use client';

import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import {
  TextureLoader,
  MeshStandardMaterial,
  DoubleSide,
  Color,
  Mesh,
  Group,
  BackSide,
  ShaderMaterial,
  Box3,
  Vector3,
  MathUtils,
} from 'three';

function LoadingBlank() {
  return null; // keep page blank during load
}

// Atmosphere glow shader
const atmosphereVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform vec3 glowColor;
  uniform float intensity;
  
  void main() {
    // Calculate rim lighting effect
    float rimPower = 2.5;
    float rim = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
    rim = pow(rim, rimPower);
    
    // Apply glow with falloff
    vec3 glow = glowColor * rim * intensity;
    
    gl_FragColor = vec4(glow, rim * 0.8);
  }
`;

function EarthAtmosphere({ radius }: { radius: number }) {
  const materialRef = useRef<ShaderMaterial>(null);
  
  useFrame((state) => {
    if (materialRef.current) {
      // Subtle pulsing effect
      materialRef.current.uniforms.intensity.value = 0.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });
  
  // Atmosphere should be 15% larger than Earth's actual radius
  const atmosphereRadius = radius * 1.15;
  
  return (
    <mesh scale={[atmosphereRadius, atmosphereRadius, atmosphereRadius]}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={atmosphereVertexShader}
        fragmentShader={atmosphereFragmentShader}
        uniforms={{
          glowColor: { value: new Color(0xaaddff) }, // Light blue glow
          intensity: { value: 1.12 }
        }}
        side={BackSide}
        transparent={true}
        depthWrite={false}
        blending={2} // AdditiveBlending for brighter glow
      />
    </mesh>
  );
}

function EarthModel({
    gltfPath = '/earth/scene.gltf',
    texPath = '/earth/textures/Material.002_diffuse.jpeg',
    targetSize = 2.0,
    // scrollProgress: value 0..1 passed from page.tsx (0 = top, 1 = scrolled target amount)
    scrollProgress = 0,
  }: {
    gltfPath?: string;
    texPath?: string;
    targetSize?: number;
    scrollProgress?: number;
}) {
  // load glTF and texture
  const gltf = useGLTF(gltfPath) as any;
  const texture = useLoader(TextureLoader, texPath);
  const groupRef = useRef<Group | null>(null);
  const atmosphereRef = useRef<Group | null>(null);
  const [normalizedScale, setNormalizedScale] = React.useState(1.0);
  const [actualRadius, setActualRadius] = React.useState(1.0);
  const moveAmount = 2.2;
  // flipY false typical for glTF textures
  texture.flipY = false;

  useEffect(() => {
    if (!gltf || !gltf.scene) {
      console.warn('GLTF did not load or has no scene:', gltf);
      return;
    }

    // Calculate bounding box to normalize size
    const box = new Box3().setFromObject(gltf.scene);
    const size = new Vector3();
    box.getSize(size);
    
    // Get the largest dimension
    const maxDimension = Math.max(size.x, size.y, size.z);
    
    // Calculate scale to match target size
    const scale = targetSize / maxDimension;
    setNormalizedScale(scale);
    
    // Calculate the actual radius after scaling (for atmosphere)
    const radius = (maxDimension / 2) * scale;
    setActualRadius(radius);
    
    console.log('GLTF original size:', size);
    console.log('Max dimension:', maxDimension);
    console.log('Normalized scale:', scale);
    console.log('Target size:', targetSize);
    console.log('Actual radius:', radius);
    console.log('Atmosphere radius will be:', radius * 1.15);

    // Walk scene and replace materials with MeshStandardMaterial for lighting
    gltf.scene.traverse((obj: unknown) => {
      const o = obj as Mesh | Group | any;
      if (o && o.isMesh) {
        const mesh = o as Mesh;

        // Create MeshStandardMaterial which responds to lighting
        const standard = new MeshStandardMaterial({
          map: texture,
          side: DoubleSide,
          roughness: 0.8, // slightly rough for realistic look
          metalness: 0.1, // minimal metalness
        });

        // Apply base color if original material had one
        try {
          const oldMat = mesh.material as any;
          if (oldMat && oldMat.color) standard.color.copy(oldMat.color);
        } catch (e) {
          // ignore
        }

        standard.needsUpdate = true;
        mesh.material = standard;
        mesh.visible = true;
      }
    });
  }, [gltf, texture, targetSize]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.8;
    }
    if (atmosphereRef.current) {
      // Atmosphere rotates with Earth
      atmosphereRef.current.rotation.y += delta * 0.8;
    }
    if (groupRef.current) {
        groupRef.current.rotation.y += delta * 0.8;
        // smooth world Y position based on scrollProgress
        const cur = groupRef.current.position.y;
        const target = moveAmount * scrollProgress; // positive -> move UP
        groupRef.current.position.y = MathUtils.lerp(cur, target, 0.08);
      }
  
      if (atmosphereRef.current) {
        atmosphereRef.current.rotation.y += delta * 0.8;
        const curA = atmosphereRef.current.position.y;
        const targetA = moveAmount * scrollProgress;
        atmosphereRef.current.position.y = MathUtils.lerp(curA, targetA, 0.08);
      }
  });

  return (
    <>
      {/* Earth Model with normalized scale */}
      <group 
        ref={groupRef} 
        dispose={null} 
        scale={[normalizedScale, normalizedScale, normalizedScale]}
      >
        <primitive object={gltf.scene} />
      </group>
      
      {/* Atmosphere - separate group, positioned at origin */}
      <group ref={atmosphereRef}>
        <EarthAtmosphere radius={actualRadius} />
      </group>
    </>
  );
}

// Rotating light that follows the Earth's rotation
function RotatingLight() {
  const lightRef = useRef<any>(null);
  
  useFrame((_, delta) => {
    if (lightRef.current) {
      lightRef.current.rotation.y += delta * 0.00008;
    }
  });
  
  return (
    <group ref={lightRef}>
      <directionalLight
        position={[5, 3, 5]}
        intensity={2.5}
      />
    </group>
  );
}

export default function EarthScene({ scrollProgress = 0 }: { scrollProgress?: number }) {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      camera={{ 
        position: [0, 0, 5], // Fixed camera distance
        fov: 45,
        near: 0.1,
        far: 1000
      }}
      style={{ 
        height: '100vh', 
        width: '100vw', 
        display: 'block', 
        background: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1
      }}
    >
      {/* Dim ambient light for overall subtle illumination */}
      <ambientLight intensity={0.15} />
      
      {/* Rotating main directional light - creates dynamic lighting */}
      <RotatingLight />
      
      {/* Subtle fill light from opposite side to prevent complete darkness */}
      <directionalLight position={[-3, -2, -3]} intensity={0.3} />

      <Suspense fallback={<LoadingBlank />}>
        <EarthModel targetSize={2.0} />
      </Suspense>

      {/* Optional interaction with restricted zoom */}
      <OrbitControls 
        enablePan={false} 
        enableZoom={true}
        minDistance={3}
        maxDistance={10}
        maxPolarAngle={Math.PI / 2} 
      />
    </Canvas>
  );
}