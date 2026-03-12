"use client";

import React from "react";
import NavBar from "../components/NavBar";

const TranscribirPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 text-gray-800 font-sans">
      {/* Navegacion Fija */}
      <header className="fixed top-0 left-0 w-full z-50">
        <NavBar isTranscribirPage={true} />
      </header>

      <main className="pt-32 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Título */}
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-7xl font-paleo text-amber-900 mb-4">
              Transcribir
            </h1>
            <p className="text-gray-600 text-lg">
              Herramienta de transcripción paleográfica
            </p>
          </div>

          {/* Placeholder Content */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-12 rounded-2xl shadow-md border-2 border-amber-200">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-amber-900 mb-6">
                Página en construcción
              </h2>
              <p className="text-gray-700 text-lg">
                Esta sección estará disponible próximamente con todas las herramientas 
                de transcripción paleográfica.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TranscribirPage;
