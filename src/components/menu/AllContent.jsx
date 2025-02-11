import React from "react";

// Icons for Skills
import { FaJs, FaPython, FaReact,  } from "react-icons/fa";
import { SiDjango, SiPostgresql, SiFirebase } from "react-icons/si";

// Icons for Tools
import { FaGithub, FaCode, FaServer } from "react-icons/fa";
import { SiPostman, SiVercel, SiDocker } from "react-icons/si";
import { FaFlutter } from "react-icons/fa6";
import { BiLogoPostgresql } from "react-icons/bi";
import Skills from "./Skills";
import Tools from "./Tools";

const AllContent = () => {
  return (
    <div className="p-4">
      {/* Header */}
      <h2 className="text-lg font-semibold mb-4">All Content</h2>

      {/* Section 1 - Skills */}
      <Skills/>
      

      {/* Section 2 - Tools */}
    <Tools/>
    </div>
  );
};

export default AllContent;