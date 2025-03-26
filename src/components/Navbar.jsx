import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Importing menu and close icons
import image from "../assets/image.png";
import { navLinks } from "../constants/index";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full fixed top-0 z-30 flex items-center py-4 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo & Name */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={image}
            alt="logo"
            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full border-2 border-blue-100 group-hover:border-blue-300 transition-all duration-300"
          />
          <p
            className={`font-bold text-xl sm:text-2xl tracking-tight ${
              scrolled ? "text-gray-900" : "text-blue-600"
            } transition-colors duration-300`}
          >
            Eyuel
            <span
              className={`hidden sm:inline-block ml-2 text-base font-medium ${
                scrolled ? "text-blue-500" : "text-gray-600"
              } group-hover:text-blue-500 transition-colors duration-300`}
            >
              | Full Stack Developer
            </span>
          </p>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex flex-row items-center gap-6 lg:gap-10">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`relative text-base lg:text-lg font-medium ${
                active === link.title
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              } transition-colors duration-300`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`} className="py-1">
                {link.title}
              </a>
              {active === link.title && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full transition-all duration-300"></span>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          {toggle ? (
            <FaTimes
              className="w-8 h-8 text-blue-600 cursor-pointer transition-colors duration-300"
              onClick={() => setToggle(false)}
            />
          ) : (
            <FaBars
              className="w-8 h-8 text-blue-600 cursor-pointer transition-colors duration-300"
              onClick={() => setToggle(true)}
            />
          )}
          <div
            className={`${
              toggle ? "block" : "hidden"
            } absolute top-16 right-4 bg-white w-56 p-6 rounded-xl shadow-xl border border-gray-100 transition-all duration-300`}
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`text-base font-medium ${
                    active === link.title ? "text-blue-600" : "text-gray-700"
                  } hover:text-blue-600 transition-colors duration-300`}
                  onClick={() => {
                    setToggle(false);
                    setActive(link.title);
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;