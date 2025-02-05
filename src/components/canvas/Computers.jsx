import React, { Suspense, useEffect, useState, forwardRef, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from "three"; // Import THREE.js
import CanvasLoader from "../Loader";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./hp/scene.gltf");

  return (
    <mesh>
      <ambientLight intensity={0.9} />
      <hemisphereLight intensity={0.5} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.2}
        penumbra={1}
        intensity={1.5}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight position={[10, 10, 10]} intensity={2} />
      <directionalLight
        position={[0, 10, 0]}
        intensity={2}
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

export const ComputersCanvas = forwardRef((_, ref) => {
  const [isMobile, setIsMobile] = useState(false);
  const controlsRef = useRef();
  const navigate = useNavigate();

  const initialCameraPosition = new THREE.Vector3(-40, 0, -1.8);

  const resetCamera = () => {
    if (controlsRef.current) {
      const duration = 3.2; // Animation duration in seconds
      const startPosition = controlsRef.current.object.position.clone();
      const targetPosition = initialCameraPosition.clone();

      let startTime = null;

      const animate = (time) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / (duration * 1000), 1);

        controlsRef.current.object.position.lerpVectors(
          startPosition,
          targetPosition,
          progress
        );

        controlsRef.current.target.lerpVectors(
          controlsRef.current.target.clone(),
          new THREE.Vector3(3, 0, 0),
          progress
        );

        controlsRef.current.update();

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  };

  const toggleFullScreenAndNavigate = () => {
    resetCamera(); // Reset first
    setTimeout(() => {
      if (controlsRef.current) {
        controlsRef.current.enabled = false;
        const duration = 2.2;
        const initialPosition = controlsRef.current.object.position.clone();
        const targetPosition = new THREE.Vector3(-10, 5, 2);

        let startTime = null;
        const animate = (time) => {
          if (!startTime) startTime = time;
          const progress = Math.min((time - startTime) / (duration * 1000), 1);

          controlsRef.current.object.position.lerpVectors(
            initialPosition,
            targetPosition,
            progress
          );
          controlsRef.current.target.lerpVectors(
            controlsRef.current.target.clone(),
            new THREE.Vector3(0, 0, 0),
            progress
          );
          controlsRef.current.update();

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setTimeout(() => navigate("/home"));
          }
        };
        requestAnimationFrame(animate);
      }
    }, 4000); // Delay before zoom-in starts
  };

  return (
    <div className="relative w-full h-full">
      <Canvas
        frameloop="demand"
        shadows
        dpr={[1, 2]}
        camera={{ position: initialCameraPosition.toArray(), fov: 7 }}
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
      
      {/* Fullscreen & Reset Button */}
      <motion.button
        className="absolute bottom-5 right-5 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-500 focus:outline-none"
        onClick={toggleFullScreenAndNavigate}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.5 } }}
      >
        ⛶
      </motion.button>
    </div>
  );
});

export default ComputersCanvas;
