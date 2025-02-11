import React, { Suspense, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Html, useTexture } from "@react-three/drei";
import CanvasLoader from "../Loader";
import emailjs from '@emailjs/browser';

// Icons for contacts and textures for planets
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
    <mesh
      ref={planetRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => onPlanetClick(label, e)}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
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

const OrbitLine = ({ radius }) => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.05, radius, 64]} />
      <meshStandardMaterial color="gray" transparent opacity={0.15} />
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
        'service_x3s9gt9',
        'template_3cid0of',
        {
          from_name: form.name,
          to_name: "Eyuel",
          from_email: form.email,
          to_email: "eyueljoel21@gmail.com",
          message: form.message,
        },
        '77YejHliL9fnL75Oc'
      )
      .then(
        () => {
          setLoading(false);
          setShowSuccessModal(true);
          setForm({
            name: "",
            email: "",
            message: "",
          });
          // Close success modal after 3 seconds
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
        <Html>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 bg-opacity-90 p-5 rounded-lg text-white text-center">
            <h3 className="font-bold mb-2">Success!</h3>
            <p>Your message has been sent successfully.</p>
          </div>
        </Html>
      )}

      {selectedPlanet && !showSuccessModal && (
        <Html>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 p-5 rounded-lg text-white text-center">
          {selectedPlanet === "Email" ? (
              <div>
                <h3 className="text-blue-500 font-bold mb-3">Contact Form</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your Name"
                    className="p-2 rounded bg-gray-700 text-white"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Your Email"
                    className="p-2 rounded bg-gray-700 text-white"
                    required
                  />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Your Message"
                    className="p-2 rounded bg-gray-700 text-white"
                    rows="3"
                    required
                  />
                  <div className="flex justify-between mt-4 gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-500 p-2 border text-white font-bold border-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Sending...' : 'Send'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCloseMessage}
                      className="bg-gray-400 p-2 border text-white font-bold border-white rounded-xl hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <p>
                  <span className="text-blue-500 font-bold">Contact with:</span>{" "}
                  {selectedPlanet}
                </p>
                <div className="flex justify-between mt-4 gap-3">
                  <button
                    onClick={() => {
                      if (selectedPlanet === "GitHub") {
                        window.open("https://github.com/joel-2112", "_blank");
                      } else if (selectedPlanet === "LinkedIn") {
                        window.open("https://www.linkedin.com/in/eyuel-kassahun-5b7ab0244/", "_blank");
                      }
                       else if (selectedPlanet === "Telegram") {
                        window.open("https://t.me/Eyuel_joel", "_blank");
                      }
                      handleCloseMessage();
                    }
                  }
                    className="bg-blue-500 p-2 border text-white font-bold border-white rounded-xl hover:bg-blue-600"
                  >
                     {selectedPlanet}
                  </button>
                  <button
                    onClick={handleCloseMessage}
                    className="bg-gray-400 p-2 border text-white font-bold border-white rounded-xl hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </Html>
      )}
    </>
  );
};

const EarthCanvas = () => {
  return (
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
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 10, 0]} intensity={5} />
        <SolarSystem />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;