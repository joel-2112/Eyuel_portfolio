import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Works from "./Works";
import Contact from "./Contact";
import Projects from "./Projects";

const FirstScreen = () => {
  return (
    <div className="relative z-0 min-h-screen bg-white">
      <div className="w-full">
        <Navbar />
        <Hero />
      </div>
      <Experience />
      <Projects />
      <About/>
      <div className="relative z-0">
        <Contact />
      </div>
    </div>
  );
};

export default FirstScreen;