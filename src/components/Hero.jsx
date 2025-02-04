import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas/Computers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [zoomed, setZoomed] = useState(false);

  const handleNavigate = () => {
    setZoomed(true);
    setTimeout(() => {
      navigate("/home");
    }, 2000);
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
      </div>

      {/* 3D Scene */}
      <motion.div className="absolute inset-0 top-[300px] sm:top-[350px]">
        <ComputersCanvas zoomed={zoomed} />
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
            animate={{ y: [0, 0, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            className="w-3 h-3 rounded-full bg-blue-500 mb-1"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
