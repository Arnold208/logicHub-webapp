import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { ThreeMFLoader } from 'three/addons/loaders/3MFLoader.js';
import { OrbitControls, Environment, Stage } from '@react-three/drei';
import * as THREE from 'three';

interface STLViewerProps {
  fileData: ArrayBuffer | string | null;
  fileName?: string;
  mirrorX?: boolean;
  mirrorY?: boolean;
  mirrorZ?: boolean;
  color?: string;
  className?: string;
}

const Model = ({ fileData, fileName, color, mirrorX, mirrorY, mirrorZ, onDimensions }: any) => {
  const [object, setObject] = useState<THREE.Object3D | null>(null);

  const colorMap: { [key: string]: number } = {
    'White': 0xFFFFFF,
    'Black': 0x010101,
    'Red': 0xFF0000,
    'Blue': 0x0000FF,
    'Green': 0x00FF00,
    'Yellow': 0xFFFF00,
    'Orange': 0xFFA500,
    'Purple': 0x800080,
    'Gray': 0x808080,
  };

  const selectedColor = color && colorMap[color] !== undefined ? colorMap[color] : 0x3b82f6;

  useEffect(() => {
    if (!fileData) return;

    if (fileData instanceof ArrayBuffer) {
      const extension = fileName?.split('.').pop()?.toLowerCase();
      let loader: any;

      if (extension === 'obj') {
        loader = new OBJLoader();
      } else if (extension === '3mf') {
        loader = new ThreeMFLoader();
      } else {
        loader = new STLLoader();
      }

      try {
        const result = loader.parse(fileData);
        let mesh: THREE.Object3D;

        if (result instanceof THREE.BufferGeometry) {
          mesh = new THREE.Mesh(result);
        } else {
          mesh = result;
        }

        mesh.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshPhysicalMaterial({
              color: selectedColor,
              roughness: 0.1,
              metalness: 0.2,
              clearcoat: 1,
            });
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        const box = new THREE.Box3().setFromObject(mesh);
        const size = new THREE.Vector3();
        box.getSize(size);
        onDimensions({
          x: size.x.toFixed(2),
          y: size.y.toFixed(2),
          z: size.z.toFixed(2),
        });

        setObject(mesh);
      } catch (e) {
        console.error("Error parsing 3D model:", e);
      }
    }
  }, [fileData, fileName, selectedColor, onDimensions]);

  if (!object) return null;

  return (
    <primitive
      object={object}
      scale={[mirrorX ? -1 : 1, mirrorY ? -1 : 1, mirrorZ ? -1 : 1]}
    />
  );
};

export const STLViewer = ({ fileData, fileName, mirrorX = false, mirrorY = false, mirrorZ = false, color = 'White', className }: STLViewerProps) => {
  const [dimensions, setDimensions] = useState<{ x: string; y: string; z: string } | null>(null);

  if (!fileData) return null;

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className={className || "relative flex-1 w-full rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100/50 min-h-[400px]"}>
        <Canvas shadows camera={{ position: [30, 30, 30], fov: 35 }} className="cursor-move">
          <Suspense fallback={null}>
            <Stage
              intensity={0.6}
              environment="city"
              adjustCamera={2.5}
              center={{}}
              shadows={{ type: 'contact', opacity: 0.4, blur: 2 }}
            >
              <Model
                fileData={fileData}
                fileName={fileName}
                color={color}
                mirrorX={mirrorX}
                mirrorY={mirrorY}
                mirrorZ={mirrorZ}
                onDimensions={setDimensions}
              />
            </Stage>
            <OrbitControls
              makeDefault
              minPolarAngle={0}
              maxPolarAngle={Math.PI / 1.75}
              enableDamping={true}
              dampingFactor={0.05}
            />
            <Environment preset="city" environmentIntensity={1.0} />
          </Suspense>
        </Canvas>
      </div>
      {dimensions && (
        <div className="grid grid-cols-3 gap-2 px-2 pb-2">
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-2 border border-gray-100 text-center">
            <span className="block text-[10px] uppercase tracking-wider text-gray-500 font-bold">Width</span>
            <span className="text-sm font-mono font-bold text-blue-600">{dimensions.x}mm</span>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-2 border border-gray-100 text-center">
            <span className="block text-[10px] uppercase tracking-wider text-gray-500 font-bold">Depth</span>
            <span className="text-sm font-mono font-bold text-blue-600">{dimensions.y}mm</span>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-2 border border-gray-100 text-center">
            <span className="block text-[10px] uppercase tracking-wider text-gray-500 font-bold">Height</span>
            <span className="text-sm font-mono font-bold text-blue-600">{dimensions.z}mm</span>
          </div>
        </div>
      )}
    </div>
  );
};
