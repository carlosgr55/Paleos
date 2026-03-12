import React from "react";
import NavBar from "./components/NavBar";
import Link from "next/link";


const LandingPage = () => {
  const manuscritos = [
    { id: 1, img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop", alt: "Manuscrito 1" },
    { id: 2, img: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&h=300&fit=crop", alt: "Manuscrito 2" },
    { id: 3, img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop", alt: "Manuscrito 3" },
    { id: 4, img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop", alt: "Manuscrito 4" },
    { id: 5, img: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=300&fit=crop", alt: "Manuscrito 5" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 text-gray-800 font-sans">
      {/* Navegacion Fija */}
      <header className="fixed top-0 left-0 w-full z-50">
        <NavBar />
      </header>

      <main className="pt-24">
        {/* Titulo Centrado */}
        <div className="text-center py-8">
          <h1 className="text-8xl md:text-9xl font-paleo text-amber-900">
            Paleos
          </h1>
        </div>

        {/* Banner de Manuscritos Históricos */}
        <section className="w-full bg-gradient-to-r from-amber-100 via-yellow-50 to-orange-100 py-12 mb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
              {manuscritos.map((item) => (
                <div
                  key={item.id}
                  className="aspect-[4/3] bg-white rounded-2xl border-4 border-[#8B7355] overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            
            {/* Botón Comenzar */}
            <div className="flex justify-center mt-8">
              <Link href="/archivo" className="no-underline">
                <button className="bg-[#8B7355] hover:bg-[#6B5744] text-white px-12 py-4 rounded-full text-xl font-bold transition-all hover:scale-105 shadow-lg shadow-amber-300">
                  Comenzar
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Sección Sobre paleos */}
        <section id="sobre-paleos-section" className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl shadow-md border-2 border-amber-200">
            <h2 className="text-3xl font-bold mb-6 text-amber-900 text-center">
              Sobre Paleos
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg text-center">
              Paleos es una herramienta computacional especializada en la transcripción paleográfica, 
              particularmente de manuscritos del periodo novohispano de México.
            </p>
          </div>
        </section>
        {/* Misión */}
        <section id="mision-section" className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl shadow-md border-2 border-amber-200">
            <h2 className="text-3xl font-bold mb-6 text-amber-900 text-center">
              Nuestra misión
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg text-center">
              Buscamos apoyar a estudiantes que cursan o hayan cursado la materia de Paleografía a 
              la transcripción de textos y documentos históricos por medio de un software de aplicación.  
            </p>
          </div>
        </section>
        {/* Sobre nosotros */}
        <section id="sobre-nosotros-section" className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl shadow-md border-2 border-amber-200">
            <h2 className="text-3xl font-bold mb-6 text-amber-900 text-center">
              Sobre Nosotros
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg text-center">
              Somos un equipo de desarrolladores estudiantes de la carrera de Ingeniería en 
              Sistemas Computacionales del Insituto Tecnológico de Chihuahua 2, que buscan apoyar
              a estudiantes e historiadores.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-amber-900 to-orange-900 text-white py-12 mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Contacto */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-4">Contacto</h3>
              <a 
                href="mailto:contacto@paleos.com" 
                className="text-amber-200 hover:text-amber-100 transition-colors"
              >
                contacto@paleos.com
              </a>
            </div>

            {/* Logo Central */}
            <div className="text-center">
              <h2 className="text-3xl font-paleo text-amber-100">Paleos</h2>
              <p className="text-sm text-amber-200 mt-2">© 2026 Todos los derechos reservados</p>
            </div>

            {/* Enlaces de Investigación */}
            <div className="text-center md:text-right">
              <h3 className="text-xl font-bold mb-4">Investigación</h3>
              <div className="flex flex-col gap-2">
                <a 
                  href="/protocolo-investigacion.pdf" 
                  target="_blank"
                  className="text-amber-200 hover:text-amber-100 transition-colors"
                >
                  Protocolo de investigación
                </a>
                <a 
                  href="/informe-investigacion.pdf" 
                  target="_blank"
                  className="text-amber-200 hover:text-amber-100 transition-colors"
                >
                  Informe de investigación
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
