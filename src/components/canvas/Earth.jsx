import React, { Suspense, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Html, useTexture } from "@react-three/drei";
import CanvasLoader from "../Loader";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import Particles from "react-tsparticles"; // For particle trails

// Icons and textures
import LinkedInIcon from "../../assets/linkedin.png";
import GitHubIcon from "../../assets/github.png";
import EmailIcon from "../../assets/email.png";
import TelegramIcon from "../../assets/telegram.png";
import SunTexture from "../../assets/center.png";

const CentralSphere = () => {
  const sunTexture = useTexture(SunTexture);
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial map={sunTexture} emissiveIntensity={2} />
    </mesh>
  );
};

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
  const planetTexture = useTexture(texture);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    planetRef.current.position.x = Math.cos(time * speed) * orbitRadius;
    planetRef.current.position.z = Math.sin(time * speed) * orbitRadius;
  });

  return (
    <motion.mesh
      ref={planetRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => onPlanetClick(label, e)}
      whileHover={{ scale: 1.2 }}
      transition={{ duration: 0.3 }}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial map={planetTexture} />
      <Html distanceFactor={10}>
        <div className="pointer-events-none text-center">
          <img src={icon} alt={label} className="w-8 h-8 rounded-full shadow-md" />
          <p className="text-indigo-600 text-sm font-medium">{label}</p>
        </div>
      </Html>
    </motion.mesh>
  );
};

const OrbitLine = ({ radius }) => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.05, radius + 0.05, 64]} />
      <meshStandardMaterial
        color="#3b82f6" // Professional blue
        transparent
        opacity={0.7}
        emissive="#3b82f6"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
};

const SolarSystem = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handlePlanetClick = (label, event) => {
    event.stopPropagation();
    setSelectedPlanet(label);
  };

  const handleCloseMessage = () => {
    setSelectedPlanet(null);
    setShowSuccessModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_x3s9gt9",
        "template_3cid0of",
        {
          from_name: form.name,
          to_name: "Eyuel",
          from_email: form.email,
          to_email: "eyueljoel21@gmail.com",
          message: form.message,
        },
        "77YejHliL9fnL75Oc"
      )
      .then(
        () => {
          setLoading(false);
          setShowSuccessModal(true);
          setForm({ name: "", email: "", message: "" });
          setTimeout(() => {
            setShowSuccessModal(false);
            setSelectedPlanet(null);
          }, 3000);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Something went wrong. Please try again.");
        }
      );
  };

  return (
    <>
      <CentralSphere />
      <PlanetWithIcon
        position={[4, 0, 0]}
        icon={TelegramIcon}
        label="Telegram"
        onPlanetClick={handlePlanetClick}
        orbitRadius={4}
        speed={0.4}
        texture={TelegramIcon}
      />
      <OrbitLine radius={4} />
      <PlanetWithIcon
        position={[3, 0, 0]}
        icon={LinkedInIcon}
        label="LinkedIn"
        onPlanetClick={handlePlanetClick}
        orbitRadius={3}
        speed={0.5}
        texture={LinkedInIcon}
      />
      <OrbitLine radius={3} />
      <PlanetWithIcon
        position={[5, 0, 0]}
        icon={GitHubIcon}
        label="GitHub"
        onPlanetClick={handlePlanetClick}
        orbitRadius={5}
        speed={0.3}
        texture={GitHubIcon}
      />
      <OrbitLine radius={5} />
      <PlanetWithIcon
        position={[7, 0, 0]}
        icon={EmailIcon}
        label="Email"
        onPlanetClick={handlePlanetClick}
        orbitRadius={7}
        speed={0.4}
        texture={EmailIcon}
      />
      <OrbitLine radius={7} />

      {showSuccessModal && (
        <Html center>
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 bg-opacity-90 p-6 rounded-xl text-white text-center shadow-lg max-w-md w-[200px]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-bold text-lg mb-2">Success!</h3>
            <p className="text-sm">Your message has been sent successfully.</p>
          </motion.div>
        </Html>
      )}

      {selectedPlanet && !showSuccessModal && (
        <Html center>
          {selectedPlanet === "Email" ? (
            <motion.div
              className="bg-gray-900 bg-opacity-90 p-4 sm:p-6 rounded-xl text-white border border-white shadow-xl max-w-md w-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-indigo-400 font-bold text-xl mb-4">Contact Form</h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your Name"
                  className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Your Email"
                  className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                  required
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Your Message"
                  className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                  rows="4"
                  required
                />
                <div className="flex justify-between mt-4 gap-3">
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="bg-indigo-600 p-3 rounded-lg text-white font-semibold border border-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {loading ? "Sending..." : "Send"}
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={handleCloseMessage}
                    className="bg-gray-600 p-3 rounded-lg text-white font-semibold border border-white hover:bg-gray-700 transition-colors w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              className="bg-gray-900 bg-opacity-90 p-6 rounded-xl text-white text-center shadow-xl max-w-md w-[300px]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-indigo-400 font-bold text-lg mb-4">
                <span>Contact via:</span> {selectedPlanet}
              </p>
              <div className="flex justify-between mt-4 gap-3">
                <motion.button
                  onClick={() => {
                    if (selectedPlanet === "GitHub") {
                      window.open("https://github.com/joel-2112", "_blank");
                    } else if (selectedPlanet === "LinkedIn") {
                      window.open("https://www.linkedin.com/in/eyuel-kassahun-5b7ab0244/", "_blank");
                    } else if (selectedPlanet === "Telegram") {
                      window.open("https://t.me/Eyuel_joel", "_blank");
                    }
                    handleCloseMessage();
                  }}
                  className="bg-indigo-600 p-3 rounded-lg text-white font-semibold border border-white hover:bg-indigo-700 transition-colors w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {selectedPlanet}
                </motion.button>
                <motion.button
                  onClick={handleCloseMessage}
                  className="bg-gray-600 p-3 rounded-lg text-white font-semibold border border-white hover:bg-gray-700 transition-colors w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          )}
        </Html>
      )}
    </>
  );
};

const EarthCanvas = () => {
  return (
    <div className="w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] relative">
      <Particles
        className="absolute inset-0 z-0"
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            color: { value: "#3b82f6" },
            number: { value: 50, density: { enable: true, value_area: 800 } },
            size: { value: 2 },
            move: { enable: true, speed: 0.5, direction: "none", outMode: "out" },
            line_linked: { enable: true, distance: 100, color: "#3b82f6", opacity: 0.4, width: 1 },
          },
        }}
      />
      <Canvas
        shadows
        frameloop="demand"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          fov: 25,
          near: 0.1,
          far: 200,
          position: [0, 30, 0],
        }}
        className="relative z-10"
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            autoRotate
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
          />
          <ambientLight intensity={0.5} />
          <pointLight position={[0, 10, 0]} intensity={5} />
          <SolarSystem />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default EarthCanvas;