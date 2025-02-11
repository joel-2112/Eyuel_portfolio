import React from "react";

// Icons for Development Tools
import { FaCode, FaGithub, FaGithubAlt, FaTerminal } from "react-icons/fa";
import { SiPostman, SiGit } from "react-icons/si";

// Icons for Production Tools
import { FaServer, FaDocker } from "react-icons/fa";
import { SiVercel, SiHeroku, SiNetlify } from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";
import { FaGit } from "react-icons/fa6";

const Tools = () => {
  return (
    <div className="p-4">
      {/* Section 1 - Development Tools */}
      <div className="mb-8">
        <h3 className="text-md font-medium mb-4">Development Tools</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* VS Code */}
          <div className="flex items-center space-x-2">
            <TbBrandVscode className="w-6 h-6 text-blue-500" />
            <span>VS Code</span>
          </div>

          {/* GitHub */}
          <div className="flex items-center space-x-2">
            <FaGithubAlt className="w-6 h-6 text-gray-800" />
            <span>GitHub</span>
          </div>

          {/* Git */}
          <div className="flex items-center space-x-2">
            <FaGit className="w-6 h-6 text-orange-500" />
            <span>Git</span>
          </div>

          {/* Postman */}
          <div className="flex items-center space-x-2">
            <SiPostman  className="w-6 h-6 text-orange-400" />
            <span>Postman</span>
          </div>

          {/* Terminal */}
          <div className="flex items-center space-x-2">
            <FaTerminal className="w-6 h-6 text-gray-600" />
            <span>Terminal</span>
          </div>

          {/* Code */}
          <div className="flex items-center space-x-2">
            <FaCode className="w-6 h-6 text-blue-400" />
            <span>Code</span>
          </div>
        </div>
      </div>

      {/* Section 2 - Production Tools */}
      <div>
        <h3 className="text-md font-medium mb-4">Production Tools</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Vercel */}
          <div className="flex items-center space-x-2">
            <SiVercel className="w-6 h-6 text-black" />
            <span>Vercel</span>
          </div>

          {/* Docker */}
          <div className="flex items-center space-x-2">
            <FaDocker className="w-6 h-6 text-blue-500" />
            <span>Docker</span>
          </div>

          {/* AWS */}
          {/* <div className="flex items-center space-x-2">
            <SiAws className="w-6 h-6 text-orange-500" />
            <span>AWS</span>
          </div> */}

          {/* Heroku */}
          <div className="flex items-center space-x-2">
            <SiHeroku className="w-6 h-6 text-purple-500" />
            <span>Heroku</span>
          </div>

          {/* Netlify */}
          {/* <div className="flex items-center space-x-2">
            <SiNetlify className="w-6 h-6 text-teal-500" />
            <span>Netlify</span>
          </div> */}

          {/* Server */}
          <div className="flex items-center space-x-2">
            <FaServer className="w-6 h-6 text-gray-600" />
            <span>Server</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;