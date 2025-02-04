import React, { useState, useEffect } from "react";
import { styles } from "../styles";
import { Link } from "react-router-dom";
import { menu, close } from "../assets";
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
        scrolled
          ? "bg-white border-b border-gray-200" // White background with a subtle border
          : "bg-transparent border-b border-transparent" // Transparent background and no visible border
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
              scrolled ? "text-gray-900" : "text-blue-500"
            }`}
          >
            Eyuel
            <span className={`sm:block hidden  ${scrolled ? "text-blue-500" : "text-gray-500"
            } `}>
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
                    ? "text-blue-500" // Active link color when scrolled
                    : "text-blue-400" // Active link color when unscrolled
                  : scrolled
                  ? "text-gray-500 hover:text-blue-500" // Default link color when scrolled
                  : "text-gray-500 hover:text-blue-400" // Default link color when unscrolled
              }`}
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
            className="w-[30px] h-[30px] object-contain cursor-pointer"
            style={{ filter: "brightness(0) saturate(100%) invert(44%) sepia(99%) saturate(1518%) hue-rotate(187deg) brightness(98%) contrast(91%)" }} // Blue filter
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } absolute top-16 right-4 bg-white w-[200px] p-5 rounded-lg border border-gray-200`} // White background with a border
          >
            <ul className="list-none flex flex-col gap-4">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`cursor-pointer text-[16px] font-medium transition-colors duration-300 ${
                    active === link.title
                      ? "text-blue-500" // Active link color in mobile menu
                      : "text-gray-700" // Default link color in mobile menu
                  } hover:text-blue-500`}
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