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
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Navegacion Fija */}
      <header className="fixed top-0 left-0 w-full z-50">
        <NavBar />
      </header>

      <main className="pt-24">
        {/* Titulo Centrado */}
        <div className="text-center py-8">
          <h1 className="text-8xl md:text-9xl font-paleo text-gray-900">
            Paleos
          </h1>
        </div>

        {/* Banner de Manuscritos Históricos */}
        <section className="w-full bg-gradient-to-r from-purple-50 to-pink-50 py-12 mb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {manuscritos.map((item) => (
                <div
                  key={item.id}
                  className="aspect-[4/3] bg-white rounded-2xl border-4 border-[#C77DFF] overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección Sobre Nosotros */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-gray-50/50 p-8 rounded-2xl shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
              Sobre Nosotros
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg text-center mb-8">
              Somos una página de transcripción la cual es para:{" "}
              <span className="italic font-semibold text-[#C77DFF]">chavitos buena onda</span>.
            </p>

            {/* Botón Comenzar */}
            <div className="flex justify-center">
              <Link href="/archivo" className="no-underline">
                <button className="bg-[#C77DFF] hover:bg-[#B366FF] text-white px-12 py-4 rounded-full text-xl font-bold transition-all hover:scale-105 shadow-lg shadow-purple-200">
                  Comenzar
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
