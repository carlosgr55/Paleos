"use client";

import React from "react";
import NavBar from "../components/NavBar";
import Link from "next/link";

const EncuestaPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 text-gray-800 font-sans">
      {/* Navegacion Fija */}
      <header className="fixed top-0 left-0 w-full z-50">
        <NavBar isTranscribirPage={true} />
      </header>

      <main className="pt-32 px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-paleo text-amber-900 mb-3">
              Encuesta
            </h1>
            <p className="text-gray-600 text-lg">
              Tu opinión nos ayuda a mejorar Paleos
            </p>
          </div>

          {/* Contenido de encuesta */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-12 rounded-2xl shadow-md border-2 border-amber-200">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-amber-900 mb-6">
                Próximamente
              </h2>
              <p className="text-gray-700 text-lg mb-8">
                Esta sección estará disponible pronto. Aquí podrás compartir tu experiencia 
                usando Paleos y ayudarnos a mejorar la herramienta.
              </p>
              
              <Link href="/transcribir" className="no-underline">
                <button className="bg-[#8B7355] hover:bg-[#6B5744] text-white px-8 py-3 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-lg shadow-amber-300">
                  Volver a Transcribir
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EncuestaPage;
