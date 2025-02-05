import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas/Computers";
import {  useRef } from "react";

const Hero = () => {

  const controlsRef = useRef();



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
       
      </div>

      {/* 3D Scene */}
      <motion.div
        className="absolute  inset-0 top-[300px] sm:top-[350px]"
        initial={{ opacity: 1 }}
        transition={{ duration: 2, delay: 2 }} // Slow fade-in effect
      >
        <ComputersCanvas ref={controlsRef}   />
      </motion.div>

    
    </section>
  );
};

export default Hero;