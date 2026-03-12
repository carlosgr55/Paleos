"use client";

import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import NextLink from "next/link";

interface NavBarProps {
  isTranscribirPage?: boolean;
}

const NavBar = ({ isTranscribirPage = false }: NavBarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowDimension, setWindowDimension] = useState({
    innerHeight: 0,
    innerWidth: 0,
  });

  useEffect(() => {
    const detectSize = () => {
      setWindowDimension({
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
      });
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    detectSize();
    window.addEventListener("resize", detectSize);
    return () => window.removeEventListener("resize", detectSize);
  }, []);

  // Links diferentes según la página
  const scrollLinks = [
    { id: 1, name: "Sobre Paleos", src: "sobre-paleos-section" },
    { id: 2, name: "Misión", src: "mision-section" },
    { id: 3, name: "Sobre Nosotros", src: "sobre-nosotros-section" }
  ];

return (
  <nav
    className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 transition-all duration-300 shadow-lg 
    ${menuOpen ? "rounded-3xl bg-white/95" : "h-16 rounded-full bg-white/80"} backdrop-blur-md border border-gray-200`}
  >
    <div className="flex items-center justify-between h-16 px-8">
      {/* Logp: desaparece si el menu está abierto */}
      {!menuOpen && (
        <Link
          to="home"
          smooth={true}
          className="text-4xl cursor-pointer text-amber-900 font-paleo transition-all hover:text-[#8B7355]"
        >
          Paleos
        </Link>
      )}

      {/*  mantiene el icono a la derecha si no hay logo */}
      {menuOpen && <div className="flex-1"></div>}

      {/* LINKS escritorio */}
      <div className="hidden md:flex items-center gap-10">
        {isTranscribirPage ? (
          <NextLink href="/" className="cursor-pointer text-[#8B7355] hover:text-[#A0826D] font-medium transition-all no-underline">
            Inicio
          </NextLink>
        ) : (
          <>
            {scrollLinks.map((l) => (
              <Link
                key={l.id}
                to={l.src}
                smooth={true}
                className="cursor-pointer text-[#8B7355] hover:text-[#A0826D] font-medium transition-all"
              >
                {l.name}
              </Link>
            ))}
            <NextLink href="/transcribir" className="cursor-pointer text-[#8B7355] hover:text-[#A0826D] font-medium transition-all no-underline">
              Transcribir
            </NextLink>
          </>
        )}
      </div>

      {/* Icono menu movil */}
      <div className="md:hidden flex items-center">
        {!menuOpen ? (
          <AiOutlineMenu
            size={25}
            className="text-gray-800 cursor-pointer"
            onClick={() => setMenuOpen(true)}
          />
        ) : (
          <AiOutlineClose
            size={25}
            className="text-gray-800 cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </div>
    </div>

    {/* MENU DESPLEGABLE: Ahora es parte del mismo contenedor blanco */}
    {menuOpen && (
      <div className="flex flex-col items-center justify-center gap-6 py-8 border-t border-gray-100">
        {isTranscribirPage ? (
          <NextLink 
            href="/" 
            className="text-xl text-[#8B7355] hover:text-[#A0826D] font-semibold transition-all no-underline"
            onClick={() => setMenuOpen(false)}
          >
            Inicio
          </NextLink>
        ) : (
          <>
            {scrollLinks.map((l) => (
              <Link
                key={l.id}
                to={l.src}
                smooth={true}
                duration={500}
                className="text-xl text-[#8B7355] hover:text-[#A0826D] font-semibold transition-all"
                onClick={() => setMenuOpen(false)}
              >
                {l.name}
              </Link>
            ))}
            <NextLink 
              href="/transcribir" 
              className="text-xl text-[#8B7355] hover:text-[#A0826D] font-semibold transition-all no-underline"
              onClick={() => setMenuOpen(false)}
            >
              Transcribir
            </NextLink>
          </>
        )}
      </div>
    )}
  </nav>
);
};

export default NavBar;
