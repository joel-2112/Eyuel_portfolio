import React from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import {
  FaCode,
  FaMobileAlt,
  FaPaintBrush,
  FaArrowRight,
} from "react-icons/fa";
import Particles from "react-tsparticles"; // Add this library for particle animation

const About = () => {
  const cardVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.4, duration: 1 },
    },
  };

  const services = [
    {
      title: "Web Development",
      icon: <FaCode />,
      description: "Building responsive and scalable web applications.",
    },
    {
      title: "Mobile App Development",
      icon: <FaMobileAlt />,
      description: "Creating cross-platform mobile apps with Flutter.",
    },
    {
      title: "Design",
      icon: <FaPaintBrush />,
      description: "Crafting intuitive and visually appealing UIs with Figma.",
    },
  ];

  return (
    <div
      id="about"
      className="relative bg-gradient-to-br from-gray-50 via-indigo-50 to-white py-24 px-4 sm:px-6 lg:px-12 text-center overflow-hidden"
    >
      {/* Particle Background for Surprise Effect */}
      <Particles
        className="absolute inset-0 z-0"
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          interactivity: {
            detectsOn: "canvas",
            events: { onHover: { enable: true, mode: "repulse" } },
          },
          particles: {
            color: { value: "#6366f1" },
            number: { value: 80, density: { enable: true, value_area: 800 } },
            size: { value: 3 },
            move: { enable: true, speed: 1 },
          },
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10"
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-800"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          About Me
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          Hey, I’m Eyuel — a Full-Stack Developer & Creative Technologist who
          loves to build more than just apps — I build experiences. I specialize
          in Django, React, Flutter, and Node.js, blending clean code with bold
          design. Lately, I’ve been diving into 3D web spaces with Three.js,
          bringing interfaces to life in new, interactive ways. I’m passionate
          about telling stories through technology, often inspired by Ethiopian
          culture, landscapes, and innovation. Whether it’s cross-platform web
          apps, mobile experiences, or immersive portfolios, I aim to create
          solutions that stand out and inspire. Let’s build something remarkable
          together 🚀
        </motion.p>
        <motion.a
          href="#contact"
          className="relative z-10 inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get in Touch <FaArrowRight className="ml-2" />
        </motion.a>
      </motion.div>

      <div className="relative z-10 mt-16 flex flex-wrap justify-center gap-8 sm:gap-10">
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            className="w-full sm:w-80"
          >
            <Tilt
              options={{ max: 35, scale: 1.1, glare: true, "max-glare": 0.6 }}
            >
              <div className="relative bg-white  rounded-xl p-6 h-72 flex flex-col items-center justify-center border-2 border-indigo-300 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-100 via-white to-indigo-50 opacity-50 animate-pulse-slow" />
                <div className="relative z-10 text-indigo-600 text-5xl mb-6 transition-transform duration-300 hover:scale-110">
                  {service.icon}
                </div>
                <h3 className="relative z-10 text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="relative z-10 text-sm text-gray-600 text-center px-2">
                  {service.description}
                </p>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;
