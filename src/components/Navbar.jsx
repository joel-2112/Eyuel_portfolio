import React, { useState, useEffect } from "react";
import { styles } from "../styles";
import { Link } from "react-router-dom";
import {  menu, close } from "../assets";
import image from "../assets/image.png";
import { navLinks } from "../constants/index";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full fixed top-0 z-20 flex items-center py-4 transition-all duration-300 ${
        scrolled ? "bg-blue-900 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo & Name */}
        <Link
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
            }}
            >
            <img
              src={image}
              alt="logo"
              className="w-10 h-10 object-cover rounded-full"
            />
            <p
              className={`font-semibold text-[20px] tracking-wide transition-all duration-300 ${
              scrolled ? "text-white" : "text-blue-400"
              }`}
            >
              Eyuel{" "}
              <span className="sm:block hidden text-gray-300">
              | Full Stack Developer |
              </span>
            </p>
            </Link>

            {/* Desktop Navigation */}
        <ul className="list-none sm:flex hidden flex-row gap-8">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`cursor-pointer text-[16px] font-medium transition-colors duration-300 ${
                active === link.title
                  ? scrolled
                    ? "text-white"
                    : "text-blue-400"
                  : "text-gray-300"
              } hover:text-blue-400`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu */}
        <div className="sm:hidden flex items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[30px] h-[30px]
             object-contain cursor-pointer "
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } absolute top-16 right-4 bg-blue-900 w-[200px] p-5 rounded-lg shadow-lg`}
          >
            <ul className="list-none flex flex-col gap-4">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`cursor-pointer text-[16px] font-medium transition-colors duration-300 ${
                    active === link.title
                      ? scrolled
                        ? "text-white"
                        : "text-blue-400"
                      : "text-gray-300"
                  } hover:text-blue-400`}
                  onClick={() => {
                    setToggle(!toggle);
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
