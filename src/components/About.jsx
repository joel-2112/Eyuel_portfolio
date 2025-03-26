import React from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { FaCode, FaMobileAlt, FaPaintBrush } from "react-icons/fa";

const About = () => {
  const cardVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: { y: 0, opacity: 1, transition: { type: "spring", bounce: 0.4, duration: 1 } },
  };

  const services = [
    { title: "Web Development", icon: <FaCode />, description: "Building responsive and scalable web applications." },
    { title: "Mobile App Development", icon: <FaMobileAlt />, description: "Creating cross-platform mobile apps Flutter." },
    { title: "Design", icon: <FaPaintBrush />, description: "Crafting intuitive and visually appealing user interfaces with figma." },
  ];

  return (
    <div id="about" className="bg-gray-100 py-20 px-4 sm:px-6 lg:px-8 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4"
      >
        About
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto text-start mb-12"
      >
        I am Eyuel, a skilled software developer experienced in web and mobile app development. I create responsive,
        user-friendly applications with a focus on innovation and efficiency. Let's bring your ideas to life with
        cutting-edge technology and creativity.
      </motion.p>

      <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
          >
            <Tilt options={{ max: 25, scale: 1.05, glare: true, "max-glare": 0.5 }}>
              <div className="relative bg-gray-100 rounded-lg p-6 w-60 sm:w-64 h-64 flex flex-col items-center justify-center border-2 border-white overflow-hidden">
                <div className="absolute inset-0 rounded-lg animate-rotate bg-[conic-gradient(from_90deg_at_50%_50%,#00f_0%,#00f_25%,transparent_50%)] opacity-30"></div>
                <div className="absolute inset-[2px] bg-gray-100 rounded-lg"></div>
                <div className="relative z-10 text-blue-600 text-4xl sm:text-5xl mb-4">{service.icon}</div>
                <h3 className="relative z-10 text-lg sm:text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                <p className="relative z-10 text-sm text-gray-600 text-center">{service.description}</p>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;