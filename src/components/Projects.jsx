import React from "react";
import { FaGithub, FaLink } from "react-icons/fa";
import ethioexplore from "../assets/images/ethioexplore.jpg";
import internhub from "../assets/images/internhub.jpg";
import dashboard from "../assets/images/dashboard.jpg";
import GbiGubae from "../assets/images/gbigubae.jpg";
import JoGem from "../assets/images/jogem.jpg";

const projects = [
  {
    title: "Gainhopes",
    image: dashboard,
    duration: "2 months",
    description:
      "Is a website with its own CMS admin panel, where admin can manage all the content of the website.",
    tech: [
      "#React",
      "#TailwindCSS",
      "#Express.js",
      "#Mongodb",
      "#Mysql",
      "#Node.js,",
    ],
    github: "https://gainhopes.org.et",
  },
  {
    title: "Intern Hub",
    image: internhub,
    duration: "2 months",
    description:
      "Internship posting portal, with jwt authentication and role based access control",
    tech: ["#React", "#TailwindCSS", "#Express.js", "#Mongodb", "#Node.js,"],
    github: "https://github.com/joel-2112/Intern-Hub",
  },
  {
    title: "EthioExplore",
    image: ethioexplore,
    duration: "3 months",
    description:
      "A fully functional Tourism web app with user authentication and role based access control.",
    tech: ["#React", "#Express", "#MongoDB"],
    github: "https://github.com/joel-2112/Tourism",
  },
  {
    title: "GbiGubae",
    image: GbiGubae,
    duration: "1 year",
    description:
      "A flutter mobile app developed for GibiGubae collaborating with my colleagues",
    tech: ["#Flutter", "#Flutter", "#Firebase"],
    github: "GbiGubae",
  },
  {
    title: "JoGem",
    image: JoGem,
    duration: "3 day ",
    description:
      "A flutter mobile app developed with flutter and gemini ai free api integrated",
    tech: ["#Flutter", "#gemini", "#Provider"],
    github: "https://github.com/joel-2112/JoGem",
  },
];

const Projects = () => {
  return (
    <div
      id="projects"
      className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 text-gray-800"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-indigo-700 mb-6">
            My Projects
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6">
            A collection of my work showcasing creativity, technical skills, and
            modern development practices. Each project reflects my passion for
            building efficient and user-friendly applications.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative bg-gray-100 border-2 border-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden"
            >
              {/* Gradient Background */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-indigo-200 via-indigo-100 to-gray-100 opacity-50"
                style={{ zIndex: 0 }}
              />
              {/* Project Image */}
              <div className="relative z-10">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover opacity-80"
                />
              </div>

              {/* Card Content */}
              <div className="p-4 relative z-10">
                <h3 className="text-xl font-semibold text-indigo-900 mb-1">
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
                      className="text-xs font-medium px-2 py-1 rounded-full bg-white text-indigo-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-3 bg-white w-full h-px" />
                {/* Links */}
                <div className="mt-3 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <a
                      href={project.github}
                      className="text-xs font-medium text-indigo-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Github Repository
                    </a>
                    <a
                      href={project.github}
                      className="text-xs font-medium text-indigo-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub className="w-5 h-5 text-indigo-700" />
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <a
                      href={project.github}
                      className="text-xs font-medium text-indigo-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.github}
                      className="text-xs font-medium text-indigo-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLink className="w-5 h-5 text-indigo-700" />
                    </a>
                  </div>
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
