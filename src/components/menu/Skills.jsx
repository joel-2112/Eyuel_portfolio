import React from "react";

// Icons for Soft Skills
import { FaComments, FaLightbulb, FaUsers, FaPaintBrush, FaRunning } from "react-icons/fa";

// Icons for Programming Languages
import { FaJs, FaPython } from "react-icons/fa";
import { FaFlutter } from "react-icons/fa6";
import { SiDart, SiHtml5, SiCss3, SiMongodb } from "react-icons/si";

// Icons for Frameworks/Libraries
import { SiDjango, SiNodedotjs, SiExpress, SiReact, SiTailwindcss, SiPostgresql, SiMysql } from "react-icons/si";

const Skills = () => {
  return (
    <div className="p-4">
      {/* Section 1 - Soft Skills */}
      <div className="mb-8">
        <h3 className="text-md font-medium mb-4">Soft Skills</h3>
        <div className="space-y-3">
          {/* Communication */}
          <div className="flex items-center space-x-2">
            <FaComments className="w-6 h-6 text-blue-500" />
            <span>Communication</span>
          </div>

          {/* Problem Solving */}
          <div className="flex items-center space-x-2">
            <FaLightbulb className="w-6 h-6 text-yellow-500" />
            <span>Problem Solving</span>
          </div>

          {/* Teamwork */}
          <div className="flex items-center space-x-2">
            <FaUsers className="w-6 h-6 text-green-500" />
            <span>Teamwork</span>
          </div>

          {/* Creativity */}
          <div className="flex items-center space-x-2">
            <FaPaintBrush className="w-6 h-6 text-purple-500" />
            <span>Creativity</span>
          </div>

          {/* Active Listening */}
          <div className="flex items-center space-x-2">
            <FaRunning className="w-6 h-6 text-red-500" />
            <span>Active Listening</span>
          </div>
        </div>
      </div>

      {/* Section 2 - Tech Skills */}
      <div>
        <h3 className="text-md font-medium mb-4">Tech Skills</h3>

        {/* Subsection 1 - Programming Languages */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-3">Programming Languages</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* JavaScript */}
            <div className="flex items-center space-x-2">
              <FaJs className="w-6 h-6 text-yellow-400" />
              <span>JavaScript</span>
            </div>

            {/* Python */}
            <div className="flex items-center space-x-2">
              <FaPython className="w-6 h-6 text-blue-500" />
              <span>Python</span>
            </div>

            {/* Dart */}
            <div className="flex items-center space-x-2">
              <SiDart className="w-6 h-6 text-blue-400" />
              <span>Dart</span>
            </div>

            {/* HTML */}
            <div className="flex items-center space-x-2">
              <SiHtml5 className="w-6 h-6 text-orange-500" />
              <span>HTML</span>
            </div>

            {/* CSS */}
            <div className="flex items-center space-x-2">
              <SiCss3 className="w-6 h-6 text-blue-600" />
              <span>CSS</span>
            </div>
          </div>
        </div>

        {/* Subsection 2 - Frameworks/Libraries */}
        <div>
          <h4 className="text-sm font-semibold mb-3">Frameworks & Libraries</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Django */}
            <div className="flex items-center space-x-2">
              <SiDjango className="w-6 h-6 text-green-700" />
              <span>Django</span>
            </div>
            {/* flutter */}
            <div className="flex items-center space-x-2">
              <FaFlutter className="w-6 h-6 text-blue-700" />
              <span>Flutter</span>
            </div>

            {/* Node.js */}
            <div className="flex items-center space-x-2">
              <SiNodedotjs className="w-6 h-6 text-green-600" />
              <span>Node.js</span>
            </div>

            {/* Express.js */}
            <div className="flex items-center space-x-2">
              <SiExpress className="w-6 h-6 text-gray-800" />
              <span>Express.js</span>
            </div>

            {/* React */}
            <div className="flex items-center space-x-2">
              <SiReact className="w-6 h-6 text-blue-400" />
              <span>React</span>
            </div>

            {/* Tailwind CSS */}
            <div className="flex items-center space-x-2">
              <SiTailwindcss className="w-6 h-6 text-blue-500" />
              <span>Tailwind CSS</span>
            </div>

            {/* PostgreSQL */}
            <div className="flex items-center space-x-2">
              <SiPostgresql className="w-6 h-6 text-blue-800" />
              <span>PostgreSQL</span>
            </div>
            {/* mongodb */}
            <div className="flex items-center space-x-2">
              <SiMongodb className="w-6 h-6 text-green-800" />
              <span>MongoDB</span>
            </div>

            {/* MySQL */}
            <div className="flex items-center space-x-2">
              <SiMysql className="w-6 h-6 text-blue-600" />
              <span>MySQL</span>
            </div>

            {/* Django REST Framework */}
            <div className="flex items-center space-x-2">
              <SiDjango className="w-6 h-6 text-green-700" />
              <span>Django REST Framework</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;