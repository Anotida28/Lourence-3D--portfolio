import { useState, useEffect } from "react";
import { navLinks } from "../constants";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner">
        <a href="#hero" className="logo" onClick={closeMenu}>
          <span>Lourence</span>
          <span className="hidden md:inline"> Anotida Ruhwaya</span>
        </a>

        <nav className="desktop">
          <ul>
            {navLinks.map(({ link, name }) => (
              <li key={name} className="group">
                <a href={link}>
                  <span>{name}</span>
                  <span className="underline" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#contact" className="contact-btn group hidden lg:flex" onClick={closeMenu}>
          <div className="inner">
            <span>Contact me</span>
          </div>
        </a>

        {/* Hamburger button — mobile only */}
        <button
          className="lg:hidden flex flex-col justify-center gap-1.5 p-2 z-50"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              menuOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ background: "#080f1e", borderTop: menuOpen ? "1px solid rgba(255,255,255,0.08)" : "none" }}
      >
        <div className="flex flex-col px-5 py-6 gap-1">
          {navLinks.map(({ link, name }) => (
            <a
              key={name}
              href={link}
              onClick={closeMenu}
              className="text-white-50 text-lg py-3 border-b border-black-50 last:border-0 hover:text-white transition-colors"
            >
              {name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMenu}
            className="mt-4 py-3 rounded-lg bg-white text-black font-semibold text-center text-base"
          >
            Contact me
          </a>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
