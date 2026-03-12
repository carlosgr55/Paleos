"use client";

import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

interface EncuestaResponse {
  pregunta1: string;
  pregunta2: string;
  pregunta3: string;
  pregunta4: string;
  pregunta5: string;
  pregunta6: string;
  pregunta7: string;
  pregunta8: string;
  timestamp: string;
}

const ResultadosPage = () => {
  const [responses, setResponses] = useState<EncuestaResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      const response = await fetch("/api/encuesta");
      const data = await response.json();
      setResponses(data);
    } catch (error) {
      console.error("Error al cargar respuestas:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadJSON = () => {
    const dataStr = JSON.stringify(responses, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `encuestas-paleos-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getPromedio = (pregunta: string) => {
    if (responses.length === 0) return 0;
    const suma = responses.reduce((acc, r) => acc + parseInt(r[pregunta as keyof EncuestaResponse] as string || "0"), 0);
    return (suma / responses.length).toFixed(2);
  };

  const contarRespuestas = (pregunta: string, valor: string) => {
    return responses.filter(r => r[pregunta as keyof EncuestaResponse] === valor).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 text-gray-800 font-sans">
      <header className="fixed top-0 left-0 w-full z-50">
        <NavBar isTranscribirPage={true} />
      </header>

      <main className="pt-32 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-paleo text-amber-900 mb-3">
                Resultados de Encuestas
              </h1>
              <p className="text-gray-600 text-lg">
                Total de respuestas: <span className="font-bold">{responses.length}</span>
              </p>
            </div>
            <button
              onClick={downloadJSON}
              className="bg-[#8B7355] hover:bg-[#6B5744] text-white px-6 py-3 rounded-full font-bold transition-all hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Descargar JSON
            </button>
          </div>

          {responses.length === 0 ? (
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-12 rounded-2xl shadow-md border-2 border-amber-200 text-center">
              <p className="text-gray-600 text-lg">
                No hay encuestas respondidas aún.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {/* Estadísticas Resumen */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl shadow-md border-2 border-amber-200">
                <h2 className="text-2xl font-bold text-amber-900 mb-6">Resumen Estadístico</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Pregunta 1 */}
                  <div>
                    <h3 className="font-semibold text-amber-800 mb-2">1. ¿Tuvo problemas al cargar el archivo?</h3>
                    <div className="space-y-1">
                      <p>Sí: <span className="font-bold">{contarRespuestas("pregunta1", "Sí")}</span></p>
                      <p>No: <span className="font-bold">{contarRespuestas("pregunta1", "No")}</span></p>
                    </div>
                  </div>

                  {/* Pregunta 2 */}
                  <div>
                    <h3 className="font-semibold text-amber-800 mb-2">2. ¿Encontró errores críticos?</h3>
                    <div className="space-y-1">
                      <p>Sí: <span className="font-bold">{contarRespuestas("pregunta2", "Sí")}</span></p>
                      <p>No: <span className="font-bold">{contarRespuestas("pregunta2", "No")}</span></p>
                    </div>
                  </div>

                  {/* Pregunta 3 */}
                  <div>
                    <h3 className="font-semibold text-amber-800 mb-2">3. ¿Volvería a utilizar la aplicación?</h3>
                    <div className="space-y-1">
                      <p>Sí: <span className="font-bold">{contarRespuestas("pregunta3", "Sí")}</span></p>
                      <p>Tal vez: <span className="font-bold">{contarRespuestas("pregunta3", "Tal vez")}</span></p>
                      <p>No: <span className="font-bold">{contarRespuestas("pregunta3", "No")}</span></p>
                    </div>
                  </div>

                  {/* Pregunta 4 */}
                  <div>
                    <h3 className="font-semibold text-amber-800 mb-2">4. Probabilidad de recomendación</h3>
                    <p className="text-2xl font-bold text-amber-900">{getPromedio("pregunta4")} / 10</p>
                  </div>

                  {/* Pregunta 5 */}
                  <div>
                    <h3 className="font-semibold text-amber-800 mb-2">5. Satisfacción con la experiencia</h3>
                    <p className="text-2xl font-bold text-amber-900">{getPromedio("pregunta5")} / 10</p>
                  </div>

                  {/* Pregunta 6 */}
                  <div>
                    <h3 className="font-semibold text-amber-800 mb-2">6. Calidad de la transcripción</h3>
                    <p className="text-2xl font-bold text-amber-900">{getPromedio("pregunta6")} / 10</p>
                  </div>

                  {/* Pregunta 7 */}
                  <div>
                    <h3 className="font-semibold text-amber-800 mb-2">7. Utilidad para historiadores</h3>
                    <p className="text-2xl font-bold text-amber-900">{getPromedio("pregunta7")} / 10</p>
                  </div>
                </div>
              </div>

              {/* Lista de respuestas individuales */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl shadow-md border-2 border-amber-200">
                <h2 className="text-2xl font-bold text-amber-900 mb-6">Respuestas Individuales</h2>
                
                <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4">
                  {responses.map((response, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg border-2 border-amber-200">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-lg text-amber-900">Encuesta #{index + 1}</h3>
                        <span className="text-sm text-gray-600">
                          {new Date(response.timestamp).toLocaleString("es-MX")}
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-semibold">Problemas al cargar:</span> {response.pregunta1}
                        </div>
                        <div>
                          <span className="font-semibold">Errores críticos:</span> {response.pregunta2}
                        </div>
                        <div>
                          <span className="font-semibold">Volvería a usar:</span> {response.pregunta3}
                        </div>
                        <div>
                          <span className="font-semibold">Recomendación:</span> {response.pregunta4}/10
                        </div>
                        <div>
                          <span className="font-semibold">Satisfacción:</span> {response.pregunta5}/10
                        </div>
                        <div>
                          <span className="font-semibold">Calidad:</span> {response.pregunta6}/10
                        </div>
                        <div>
                          <span className="font-semibold">Utilidad:</span> {response.pregunta7}/10
                        </div>
                      </div>
                      
                      {response.pregunta8 && (
                        <div className="mt-4 pt-4 border-t border-amber-200">
                          <span className="font-semibold block mb-2">Comentarios:</span>
                          <p className="text-gray-700 italic">{response.pregunta8}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ResultadosPage;
