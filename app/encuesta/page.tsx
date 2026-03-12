"use client";

import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Link from "next/link";

const EncuestaPage = () => {
  const [formData, setFormData] = useState({
    pregunta1: "",
    pregunta2: "",
    pregunta3: "",
    pregunta4: "",
    pregunta5: "",
    pregunta6: "",
    pregunta7: "",
    pregunta8: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleRadioChange = (question: string, value: string) => {
    setFormData({ ...formData, [question]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que todas las preguntas estén respondidas
    const allAnswered = Object.values(formData).every(value => value !== "");
    
    if (!allAnswered) {
      setError("Por favor responde todas las preguntas antes de enviar.");
      return;
    }

    try {
      const response = await fetch("/api/encuesta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al guardar la encuesta");
      }

      setSubmitted(true);
      setError("");
    } catch (err) {
      setError("Hubo un error al enviar la encuesta. Por favor, intenta de nuevo.");
      console.error(err);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 text-gray-800 font-sans">
        <header className="fixed top-0 left-0 w-full z-50">
          <NavBar isTranscribirPage={true} />
        </header>

        <main className="pt-32 px-6 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-12 rounded-2xl shadow-md border-2 border-amber-200 text-center">
              <div className="mb-6">
                <svg className="mx-auto h-20 w-20 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-amber-900 mb-4">
                ¡Gracias por tu tiempo!
              </h2>
              <p className="text-gray-700 text-lg mb-8">
                Tu retroalimentación nos ayudará a mejorar Paleos.
              </p>
              <Link href="/transcribir" className="no-underline">
                <button className="bg-[#8B7355] hover:bg-[#6B5744] text-white px-8 py-3 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-lg shadow-amber-300">
                  Volver a Transcribir
                </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 text-gray-800 font-sans">
      <header className="fixed top-0 left-0 w-full z-50">
        <NavBar isTranscribirPage={true} />
      </header>

      <main className="pt-32 px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-paleo text-amber-900 mb-3">
              Encuesta
            </h1>
            <p className="text-gray-600 text-lg">
              Tu opinión nos ayuda a mejorar Paleos
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl shadow-md border-2 border-amber-200">
            
            {/* Pregunta 1 */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-amber-900 mb-3">
                1. ¿Tuvo algún problema al cargar el archivo?
              </label>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="pregunta1"
                    value="Sí"
                    checked={formData.pregunta1 === "Sí"}
                    onChange={(e) => handleRadioChange("pregunta1", e.target.value)}
                    className="w-4 h-4 text-amber-700 focus:ring-amber-600"
                  />
                  <span className="ml-3 text-gray-700">Sí</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="pregunta1"
                    value="No"
                    checked={formData.pregunta1 === "No"}
                    onChange={(e) => handleRadioChange("pregunta1", e.target.value)}
                    className="w-4 h-4 text-amber-700 focus:ring-amber-600"
                  />
                  <span className="ml-3 text-gray-700">No</span>
                </label>
              </div>
            </div>

            {/* Pregunta 2 */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-amber-900 mb-3">
                2. ¿Encontró algún tipo de error crítico en el documento transcrito?
              </label>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="pregunta2"
                    value="Sí"
                    checked={formData.pregunta2 === "Sí"}
                    onChange={(e) => handleRadioChange("pregunta2", e.target.value)}
                    className="w-4 h-4 text-amber-700 focus:ring-amber-600"
                  />
                  <span className="ml-3 text-gray-700">Sí</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="pregunta2"
                    value="No"
                    checked={formData.pregunta2 === "No"}
                    onChange={(e) => handleRadioChange("pregunta2", e.target.value)}
                    className="w-4 h-4 text-amber-700 focus:ring-amber-600"
                  />
                  <span className="ml-3 text-gray-700">No</span>
                </label>
              </div>
            </div>

            {/* Pregunta 3 */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-amber-900 mb-3">
                3. ¿Volvería a utilizar esta aplicación?
              </label>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="pregunta3"
                    value="Sí"
                    checked={formData.pregunta3 === "Sí"}
                    onChange={(e) => handleRadioChange("pregunta3", e.target.value)}
                    className="w-4 h-4 text-amber-700 focus:ring-amber-600"
                  />
                  <span className="ml-3 text-gray-700">Sí</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="pregunta3"
                    value="Tal vez"
                    checked={formData.pregunta3 === "Tal vez"}
                    onChange={(e) => handleRadioChange("pregunta3", e.target.value)}
                    className="w-4 h-4 text-amber-700 focus:ring-amber-600"
                  />
                  <span className="ml-3 text-gray-700">Tal vez</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="pregunta3"
                    value="No"
                    checked={formData.pregunta3 === "No"}
                    onChange={(e) => handleRadioChange("pregunta3", e.target.value)}
                    className="w-4 h-4 text-amber-700 focus:ring-amber-600"
                  />
                  <span className="ml-3 text-gray-700">No</span>
                </label>
              </div>
            </div>

            <div className="border-t-2 border-amber-300 my-8 pt-8">
              <h3 className="text-xl font-bold text-amber-900 mb-6">
                En una escala del 1 al 10, en donde 1 es muy poco y 10 es mucho, responda las siguientes preguntas:
              </h3>

              {/* Pregunta 4 */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-amber-900 mb-3">
                  4. ¿Qué tan probable es que recomiende esta aplicación a algún conocido?
                </label>
                <div className="flex gap-2 flex-wrap">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <label key={num} className="cursor-pointer">
                      <input
                        type="radio"
                        name="pregunta4"
                        value={num.toString()}
                        checked={formData.pregunta4 === num.toString()}
                        onChange={(e) => handleRadioChange("pregunta4", e.target.value)}
                        className="sr-only"
                      />
                      <span className={`inline-block px-4 py-2 rounded-lg border-2 transition-all ${
                        formData.pregunta4 === num.toString()
                          ? "bg-amber-700 text-white border-amber-700"
                          : "bg-white text-gray-700 border-amber-300 hover:border-amber-500"
                      }`}>
                        {num}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Pregunta 5 */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-amber-900 mb-3">
                  5. ¿Qué tan satisfecho se quedó con la experiencia de esta aplicación?
                </label>
                <div className="flex gap-2 flex-wrap">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <label key={num} className="cursor-pointer">
                      <input
                        type="radio"
                        name="pregunta5"
                        value={num.toString()}
                        checked={formData.pregunta5 === num.toString()}
                        onChange={(e) => handleRadioChange("pregunta5", e.target.value)}
                        className="sr-only"
                      />
                      <span className={`inline-block px-4 py-2 rounded-lg border-2 transition-all ${
                        formData.pregunta5 === num.toString()
                          ? "bg-amber-700 text-white border-amber-700"
                          : "bg-white text-gray-700 border-amber-300 hover:border-amber-500"
                      }`}>
                        {num}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Pregunta 6 */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-amber-900 mb-3">
                  6. ¿Qué tan buena fue la transcripción realizada por Paleos?
                </label>
                <div className="flex gap-2 flex-wrap">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <label key={num} className="cursor-pointer">
                      <input
                        type="radio"
                        name="pregunta6"
                        value={num.toString()}
                        checked={formData.pregunta6 === num.toString()}
                        onChange={(e) => handleRadioChange("pregunta6", e.target.value)}
                        className="sr-only"
                      />
                      <span className={`inline-block px-4 py-2 rounded-lg border-2 transition-all ${
                        formData.pregunta6 === num.toString()
                          ? "bg-amber-700 text-white border-amber-700"
                          : "bg-white text-gray-700 border-amber-300 hover:border-amber-500"
                      }`}>
                        {num}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Pregunta 7 */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-amber-900 mb-3">
                  7. ¿Qué tanto considera que esta aplicación le pueda ayudar en su día a día como historiador?
                </label>
                <div className="flex gap-2 flex-wrap">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <label key={num} className="cursor-pointer">
                      <input
                        type="radio"
                        name="pregunta7"
                        value={num.toString()}
                        checked={formData.pregunta7 === num.toString()}
                        onChange={(e) => handleRadioChange("pregunta7", e.target.value)}
                        className="sr-only"
                      />
                      <span className={`inline-block px-4 py-2 rounded-lg border-2 transition-all ${
                        formData.pregunta7 === num.toString()
                          ? "bg-amber-700 text-white border-amber-700"
                          : "bg-white text-gray-700 border-amber-300 hover:border-amber-500"
                      }`}>
                        {num}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Pregunta 8 - Comentarios */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-amber-900 mb-3">
                8. Comentarios y retroalimentaciones libres
              </label>
              <textarea
                name="pregunta8"
                value={formData.pregunta8}
                onChange={(e) => setFormData({ ...formData, pregunta8: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-600 resize-none"
                placeholder="Comparte tus comentarios, sugerencias o cualquier retroalimentación..."
              />
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#8B7355] hover:bg-[#6B5744] text-white px-12 py-4 rounded-full text-xl font-bold transition-all hover:scale-105 shadow-lg shadow-amber-300"
              >
                Enviar Encuesta
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EncuestaPage;
