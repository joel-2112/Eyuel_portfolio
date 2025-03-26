import React from "react";
import { FaGithub } from "react-icons/fa"; // GitHub icon
import ethioexplore from "../assets/images/ethioexplore.jpg"
import  internhub from "../assets/images/internhub.jpg"
import  GbiGubae from "../assets/images/gbigubae.jpg"
import  JoGem from "../assets/images/jogem.jpg"
// Sample project data (replace with your actual projects)
const projects = [
  {
    title: "Intern Hub",
    image: internhub, // Replace with actual image
    duration: "2 months",
    description: "Internship posting portal, with jwt authentication and role based access control",
    tech: ["#React", "#TailwindCSS", "#Express.js","#Mongodb", "#Node.js,"],
    github: "https://github.com/joel-2112/Intern-Hub",
  },
  {
    title: "EthioExplore",
    image: ethioexplore,
    duration: "3 months",
    description: "A fully functional Tourism web app  with  user authentication and role based access control.",
    tech: ["#React", "#Express", "#MongoDB"],
    github: "https://github.com/joel-2112/Tourism",
  },
  {
    title: "GbiGubae",
    image: GbiGubae,
    duration: "1 year",
    description: " a A flutter mobile app developed for GibiGubae collaborating with my colleagues",
    tech: ["#Flutter", "#Flutter", "#Firebase"],
    github: GbiGubae,
  },
  {
    title: "JoGem",
    image: JoGem,
    duration: "3 day ",
    description: " a A flutter mobile app developed with flutter and gemini ai free api integrated",
    tech: ["#Flutter","#gemini",  "#Provider"],
    github: "https://github.com/joel-2112/JoGem",
  },
];
const Projects = () => {
  return (
    <div id="projects" className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Heading & Description */}
        <div className="flex flex-col ">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            My Projects
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6">
            A collection of my work showcasing creativity, technical skills, and modern development practices. Each project reflects my passion for building efficient and user-friendly applications.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
              Full Stack Development
            </span>
            <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
              Responsive Design
            </span>
            <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
              Modern UI/UX
            </span>
          </div>
        </div>
        {/* Right Column: Project Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Project Image */}
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-40 sm:h-48 object-cover"
                />
                {/* GitHub Link */}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-2 right-2 bg-gray-800 p-2 rounded-full text-white hover:bg-gray-700 transition-colors duration-300"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
              </div>

              {/* Card Content */}
              <div className="p-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{project.duration}</p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {project.description}
                </p>
                {/* Tech Tags */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        tag.includes("React") || tag.includes("Vue")
                          ? "bg-blue-100 text-blue-600"
                          : tag.includes("Node") || tag.includes("Express")
                          ? "bg-green-100 text-green-600"
                          : "bg-purple-100 text-purple-600"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Projects;
