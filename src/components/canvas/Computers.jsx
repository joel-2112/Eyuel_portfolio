import React, { Suspense, useEffect, useState, forwardRef, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./hp/scene.gltf");

  return (
    <mesh>
      {/* Ambient Light for general brightness */}
      <ambientLight intensity={0.9} />

      {/* Hemisphere Light for natural balance */}
      <hemisphereLight intensity={0.5} groundColor="black" />

      {/* SpotLight for focused brightness */}
      <spotLight
        position={[-20, 50, 10]}
        angle={0.2}
        penumbra={1}
        intensity={1.5} // Increased intensity
        castShadow
        shadow-mapSize={1024}
      />

      {/* Stronger Point Light */}
      <pointLight position={[10, 10, 10]} intensity={2} />

      {/* NEW: Directional Light from the top */}
      <directionalLight
        position={[0, 10, 0]} // Directly above
        intensity={2} // Strong light for a clear top view
        castShadow
        shadow-mapSize={2048}
      />

      <primitive
        object={computer.scene}
        scale={isMobile ? 21 : 28}
        position={[0, -1.5, 0]}
        rotation={[0, 0, 0]}
      />
    </mesh>
  );
};

export const ComputersCanvas = forwardRef(({ zoomed, onCameraReset }, ref) => {
  const [isMobile, setIsMobile] = useState(false);
  const controlsRef = useRef();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    if (zoomed && controlsRef.current) {
      // Reset camera to initial position
      controlsRef.current.reset();
      onCameraReset();

      // Zoom in after reset
      setTimeout(() => {
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.object.position.set(-10, 5, 2); // Adjust this for zoom effect
        controlsRef.current.update();
      }, 1000);
    }
  }, [zoomed, onCameraReset]);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [-40, 5, -1.8], fov: 7 }} // Adjusted to show the front side
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          ref={(node) => {
            controlsRef.current = node;
            if (ref) ref.current = node;
          }}
          enableZoom={true}
          enableRotate={true}
          enablePan={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={0}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
});

export default ComputersCanvas;