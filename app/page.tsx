import React from "react";
import NavBar from "./components/NavBar";
import Link from "next/link";


const LandingPage = () => {
  const carouselItems = [
    { id: 1, img: "https://via.placeholder.com/300x200", alt: "Paleo 1" },
    { id: 2, img: "https://via.placeholder.com/300x200", alt: "Paleo 2" },
    { id: 3, img: "https://via.placeholder.com/300x200", alt: "Paleo 3" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Navegacion Fija */}
      <header className="fixed top-0 left-0 w-full z-50">
        <NavBar />
      </header>

      {/* Agregamos pt-20 (padding-top) */}
      <main className="max-w-6xl mx-auto px-6 py-12 pt-24">
        <div className="flex flex-col md:flex-row items-start gap-8 mb-16">
          {/* sobre nosotros*/}
          {/* Seccion principal */}
          <div className="flex flex-col md:flex-row items-start gap-12 mb-20 pt-10">
            <div className="flex-1">
              {/* PALEOs*/}
              <h1 className="text-8xl md:text-9xl font-paleo text-gray-900">
                Paleos
              </h1>

              {/* Contenedor */}
              <div className="bg-gray-50/50 p-2 rounded-xl max-w-lg">
                <h2 className="text-2xl font-bold mb-3 text-gray-800">
                  Información sobre nosotros
                </h2>
                <p className="text-gray-500 leading-relaxed text-lg">
                  Somos una página de transcripción la cual es para:{" "}
                  <span className="italic">chavitos buena onda</span>.
                </p>
              </div>

              {/* Botón Comenzar */}
              <div className="mt-10">
                <Link href="/archivo" className="no-underline">
                  <button className="bg-[#C77DFF] hover:bg-[#B366FF] text-white px-12 py-4 rounded-full text-xl font-bold transition-all hover:scale-105 shadow-lg shadow-purple-200">
                    Comenzar
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/*   Carrusel */}
        <section className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Transcripciones</h3>

          {/* Contenedor Gridflex con scroll */}
          <div className="flex gap-8 overflow-x-auto pb-10 snap-x snap-mandatory scrollbar-hide focus:outline-none">
            {carouselItems.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-[350px] h-[220px] bg-gray-100 rounded-3xl border-4 border-[#C77DFF] overflow-hidden snap-center shadow-xl transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={item.img}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Indicador (puntos) */}
          <div className="flex justify-center gap-2 mt-4">
            {carouselItems.map((item) => (
              <div
                key={item.id}
                className="w-2 h-2 rounded-full bg-[#C77DFF] opacity-50"
              ></div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
