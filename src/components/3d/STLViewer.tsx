import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface STLViewerProps {
  fileData: ArrayBuffer | string | null;
  mirrorX?: boolean;
  mirrorY?: boolean;
  mirrorZ?: boolean;
  color?: string;
  className?: string;
}

export const STLViewer = ({ fileData, mirrorX = false, mirrorY = false, mirrorZ = false, color = 'White', className }: STLViewerProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ x: string; y: string; z: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!fileData || !mountRef.current) return;

    setLoading(true);
    setError(null);

    const width = mountRef.current.clientWidth;
    const height = 400;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    // Remove background to allow CSS styling to show through
    // scene.background = new THREE.Color(0xf5f5f5);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 10000);
    camera.position.set(0, 0, 200);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable alpha for transparent background
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Transparent clear color
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(1, 1, 1);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(-1, -1, -1);
    scene.add(directionalLight2);

    const loader = new STLLoader();

    try {
      if (fileData instanceof ArrayBuffer) {
        // Validate file size (basic sanity check)
        if (fileData.byteLength < 84) {
          throw new Error('File is too small to be a valid STL file (minimum 84 bytes)');
        }

        // Check if it's a binary STL by reading the header
        const view = new DataView(fileData);
        const isBinary = fileData.byteLength >= 84;

        if (isBinary) {
          // Read triangle count from binary STL header (bytes 80-83)
          const triangleCount = view.getUint32(80, true);
          const expectedSize = 84 + (triangleCount * 50);

          // Validate triangle count is reasonable
          if (triangleCount > 10000000) { // 10 million triangles max
            throw new Error(`File contains too many triangles (${triangleCount.toLocaleString()}). Maximum supported: 10,000,000`);
          }

          // Validate file size matches expected size
          if (Math.abs(fileData.byteLength - expectedSize) > 1) {
            throw new Error('File size does not match STL format specification. The file may be corrupted.');
          }
        }

        const geometry = loader.parse(fileData);
        geometry.computeVertexNormals();
        geometry.center();

        // Color mapping
        const colorMap: { [key: string]: number } = {
          'White': 0xFFFFFF,
          'Black': 0x000000,
          'Red': 0xFF0000,
          'Blue': 0x0000FF,
          'Green': 0x00FF00,
          'Yellow': 0xFFFF00,
          'Orange': 0xFFA500,
          'Purple': 0x800080,
          'Gray': 0x808080,
        };

        const material = new THREE.MeshPhongMaterial({
          color: colorMap[color] || 0x3b82f6,
          specular: 0x111111,
          shininess: 200,
        });

        const mesh = new THREE.Mesh(geometry, material);
        meshRef.current = mesh;
        scene.add(mesh);

        const box = new THREE.Box3().setFromObject(mesh);
        const size = new THREE.Vector3();
        box.getSize(size);

        setDimensions({
          x: size.x.toFixed(2),
          y: size.y.toFixed(2),
          z: size.z.toFixed(2),
        });

        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / Math.sin(fov / 2)) * 1.5;
        camera.position.set(0, 0, cameraZ);
        controls.target.set(0, 0, 0);

        controls.update();
        setLoading(false);
      }
    } catch (err) {
      console.error('Error loading STL file:', err);
      setError(err instanceof Error ? err.message : 'Failed to load 3D model. Please ensure the file is a valid STL format.');
      setLoading(false);

      // Clean up renderer even on error
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      return;
    }

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newWidth = mountRef.current?.clientWidth || width;
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [fileData]);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.scale.set(mirrorX ? -1 : 1, mirrorY ? -1 : 1, mirrorZ ? -1 : 1);
    }
  }, [mirrorX, mirrorY, mirrorZ]);

  // Update color dynamically
  useEffect(() => {
    if (!meshRef.current) return;

    const colorMap: { [key: string]: number } = {
      'White': 0xFFFFFF,
      'Black': 0x000000,
      'Red': 0xFF0000,
      'Blue': 0x0000FF,
      'Green': 0x00FF00,
      'Yellow': 0xFFFF00,
      'Orange': 0xFFA500,
      'Purple': 0x800080,
      'Gray': 0x808080,
    };

    const material = meshRef.current.material as THREE.MeshPhongMaterial;
    material.color.setHex(colorMap[color] || 0x3b82f6);
  }, [color]);

  return (
    <div className="space-y-4 h-full">
      <div className={className || "relative w-full rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100/50 min-h-[400px]"}>
        <div
          ref={mountRef}
          className="absolute inset-0 flex items-center justify-center cursor-move"
          style={{ width: '100%', height: '100%' }}
        />

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <div className="flex flex-col items-center">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-100 border-t-blue-600 mb-3"></div>
              <p className="text-blue-900 font-medium">Loading 3D model...</p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="font-semibold text-red-900 mb-2">Error Loading Model</h4>
          <p className="text-sm text-red-700">{error}</p>
          <p className="text-xs text-red-600 mt-2">
            Please try uploading a different file or ensure your STL file is not corrupted.
          </p>
        </div>
      )}

      {dimensions && !error && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Model Dimensions</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Width (X):</span>
              <p className="font-bold text-blue-700">{dimensions.x} mm</p>
            </div>
            <div>
              <span className="text-gray-600">Depth (Y):</span>
              <p className="font-bold text-blue-700">{dimensions.y} mm</p>
            </div>
            <div>
              <span className="text-gray-600">Height (Z):</span>
              <p className="font-bold text-blue-700">{dimensions.z} mm</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
