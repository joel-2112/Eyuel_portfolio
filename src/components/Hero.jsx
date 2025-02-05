import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas/Computers";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [zoomed, setZoomed] = useState(false);
  const controlsRef = useRef();

  const handleNavigate = () => {
    setZoomed(true);
    setTimeout(() => {
      navigate("/home");
    }, 800); // Adjust timing to match the total animation duration
  };

  const handleCameraReset = () => {
    console.log("Camera has been reset to initial position");
  };

  return (
    <section className="relative w-full h-screen mx-auto">
      {/* Content Section */}
      <div className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-blue-500" />
          <div className="w-1 sm:h-80 h-40 bg-gradient-to-b from-blue-500 to-gray-50" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText}`}>
            Hi, I'm <span className="text-blue-500">Eyuel</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-gray-600`}>
            I develop Mobile and <br className="sm:block hidden" />
            web applications with the latest technologies.
          </p>
        </div>
        <div className="bg-gray-600  p-2 mt-5 ml-10 text-gray-500 border-blue-100 border rounded-md">
          <div className=" bg-gray-200 p-2">

            <h1>play with my laptop </h1>
            <h1>if you want more information about me!!! </h1>
          </div>
        </div>
      </div>

      {/* 3D Scene */}
      <motion.div
        className="absolute  inset-0 top-[300px] sm:top-[350px]"
        initial={{ opacity: 1 }}
        animate={zoomed ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 2, delay: 2 }} // Slow fade-in effect
      >
        <ComputersCanvas ref={controlsRef} zoomed={zoomed} onCameraReset={handleCameraReset} />
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <motion.div
          className="w-[35px] h-[35px] rounded-3xl border-4 border-blue-500 flex justify-center items-start p-2 cursor-pointer"
          onClick={handleNavigate}
          initial={{ opacity: 1 }}
          animate={zoomed ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2.0, repeat: Infinity, repeatType: "loop" }}
            className="w-3 h-3 rounded-full bg-blue-500 mb-1"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;