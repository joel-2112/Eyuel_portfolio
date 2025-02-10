import React, { Suspense, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Html, useTexture } from "@react-three/drei";
import CanvasLoader from "../Loader";

// Icons for contacts
import LinkedInIcon from "../../assets/linkedin.png";
import GitHubIcon from "../../assets/github.png";
import EmailIcon from "../../assets/email.png";

// Textures for planets
import LinkedInTexture from "../../assets/linkedin.png"; // Replace with your texture
import GitHubTexture from "../../assets/github.png"; // Replace with your texture
import EmailTexture from "../../assets/email.png"; // Replace with your texture

// Sun texture
import SunTexture from "../../assets/me.jpg"; // Replace with your sun texture

// Central Sphere (Sun) with texture
const CentralSphere = () => {
  const sunTexture = useTexture(SunTexture); // Load sun texture

  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial
        map={sunTexture} // Apply sun texture
        // emissive="orange"
        emissiveIntensity={2}
        // color="yellow"
      />
    </mesh>
  );
};

// Orbiting Planet with Icon
const PlanetWithIcon = ({
  position,
  icon,
  label,
  onPlanetClick,
  orbitRadius,
  speed,
  texture,
}) => {
  const [hovered, setHovered] = useState(false);
  const planetRef = useRef();
  const planetTexture = useTexture(texture); // Load texture

  // Animate the planet around the central sphere
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    planetRef.current.position.x = Math.cos(time * speed) * orbitRadius;
    planetRef.current.position.z = Math.sin(time * speed) * orbitRadius;
  });

  return (
    <mesh
      ref={planetRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => onPlanetClick(label, e)}
    >
      <sphereGeometry args={[0.5, 32, 32]} /> {/* Increased planet size */}
      <meshStandardMaterial map={planetTexture} />
      <Html distanceFactor={10}>
        <div className="pointer-events-none text-center">
          <img src={icon} alt={label} className="w-6 h-6" />
          <p className="text-blue-500 text-xs">{label}</p>
        </div>
      </Html>
    </mesh>
  );
};

// Orbit Line
const OrbitLine = ({ radius }) => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.05, radius, 64]} />
      <meshStandardMaterial color="gray" transparent opacity={0.15} />
    </mesh>
  );
};

// Solar System Component
const SolarSystem = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const handlePlanetClick = (label, event) => {
    event.stopPropagation();
    setSelectedPlanet(label);
  };

  const handleCloseMessage = () => {
    setSelectedPlanet(null);
  };

  return (
    <>
      <CentralSphere />
      <PlanetWithIcon
        position={[3, 0, 0]}
        icon={LinkedInIcon}
        label="LinkedIn"
        onPlanetClick={handlePlanetClick}
        orbitRadius={3}
        speed={0.5}
        texture={LinkedInTexture} // Use texture
      />
      <OrbitLine radius={3} />

      <PlanetWithIcon
        position={[5, 0, 0]}
        icon={GitHubIcon}
        label="GitHub"
        onPlanetClick={handlePlanetClick}
        orbitRadius={5}
        speed={0.3}
        texture={GitHubTexture} // Use texture
      />
      <OrbitLine radius={5} />

      <PlanetWithIcon
        position={[7, 0, 0]}
        icon={EmailIcon}
        label="Email"
        onPlanetClick={handlePlanetClick}
        orbitRadius={7}
        speed={0.4}
        texture={EmailTexture} // Use texture
      />
      <OrbitLine radius={7} />

      {selectedPlanet && (
        <Html>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 p-5 rounded-lg text-white text-center">
            <p>
              <span className="text-blue-500 font-bold">Contact with:</span>{" "}
              {selectedPlanet}
            </p>
            <div className="flex justify-between mt-4 gap-3">
              <button
                onClick={handleCloseMessage}
                className="bg-gray-400 p-2 border text-white font-bold border-white rounded-xl hover:bg-gray-600"
              >
                Choose
              </button>
              <button
                onClick={handleCloseMessage}
                className="bg-gray-400 p-2 border text-white font-bold border-white rounded-xl hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </Html>
      )}
    </>
  );
};

// EarthCanvas Component
const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 25, // Wider field of view
        near: 0.1,
        far: 200,
        position: [0, 30, 0], // Directly above the scene
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={true}
          enableRotate={true} // Enable rotation
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
        <ambientLight intensity={0.5} /> {/* Add ambient light */}
        <pointLight position={[0, 10, 0]} intensity={5} /> {/* Increased light intensity */}
        <SolarSystem />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;