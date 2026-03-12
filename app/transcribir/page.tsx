"use client";

import React, { useState, useRef } from "react";
import NavBar from "../components/NavBar";

const TranscribirPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [transcribedText, setTranscribedText] = useState<string>("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedFormats = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) return;

    // Validar formato
    if (!acceptedFormats.includes(file.type)) {
      setError("Formato no válido. Solo se permiten archivos PDF, JPG, JPEG o PNG.");
      setSelectedFile(null);
      setPreviewUrl("");
      return;
    }

    setError("");
    setSelectedFile(file);
    setTranscribedText("");

    // Crear preview para imágenes
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(""); // Para PDFs no mostramos preview
    }
  };

  const handleTranscribe = async () => {
    if (!selectedFile) return;

    setIsTranscribing(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      console.log("Enviando archivo:", selectedFile.name, selectedFile.type);

      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      console.log("Respuesta del servidor:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error del servidor:", errorData);
        throw new Error(errorData.details || errorData.error || "Error al transcribir el documento");
      }

      const data = await response.json();
      console.log("Transcripción recibida exitosamente");
      setTranscribedText(data.transcription);
    } catch (err: any) {
      const errorMessage = err?.message || "Hubo un error al transcribir el documento. Por favor, intenta de nuevo.";
      setError(errorMessage);
      console.error("Error completo:", err);
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    
    if (file && fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
      const fakeEvent = {
        target: fileInputRef.current
      } as React.ChangeEvent<HTMLInputElement>;
      handleFileSelect(fakeEvent);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 text-gray-800 font-sans">
      {/* Navegacion Fija */}
      <header className="fixed top-0 left-0 w-full z-50">
        <NavBar isTranscribirPage={true} />
      </header>

      <main className="pt-32 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-paleo text-amber-900 mb-3">
              Transcribir Documento
            </h1>
            <p className="text-gray-600 text-lg">
              Sube un manuscrito histórico y obtén su transcripción paleográfica
            </p>
          </div>

          {/* Contenedor principal con dos columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Cuadro Izquierdo - Cargar Archivo */}
            <div className="flex flex-col">
              <div
                className="bg-white border-4 border-dashed border-amber-300 rounded-2xl p-8 min-h-[400px] flex flex-col items-center justify-center transition-all hover:border-amber-400"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                
                {!selectedFile ? (
                  <label htmlFor="file-upload" className="cursor-pointer text-center w-full">
                    <div className="mb-4">
                      <svg className="mx-auto h-16 w-16 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-xl font-semibold text-gray-700 mb-2">
                      Haz clic o arrastra un archivo aquí
                    </p>
                    <p className="text-sm text-gray-500">
                      Formatos aceptados: PDF, JPG, JPEG, PNG
                    </p>
                  </label>
                ) : (
                  <div className="w-full text-center">
                    {previewUrl && (
                      <img src={previewUrl} alt="Preview" className="max-h-64 mx-auto rounded-lg shadow-md mb-4" />
                    )}
                    {selectedFile.type === "application/pdf" && (
                      <div className="mb-4">
                        <svg className="mx-auto h-24 w-24 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <p className="font-semibold text-gray-700 mb-2">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500 mb-4">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <button
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl("");
                        setTranscribedText("");
                        setError("");
                      }}
                      className="text-amber-700 hover:text-amber-900 font-medium"
                    >
                      Cambiar archivo
                    </button>
                  </div>
                )}
              </div>

              {/* Botón Transcribir */}
              <button
                onClick={handleTranscribe}
                disabled={!selectedFile || isTranscribing}
                className={`mt-6 w-full py-4 rounded-full text-xl font-bold transition-all shadow-lg ${
                  selectedFile && !isTranscribing
                    ? "bg-[#8B7355] hover:bg-[#6B5744] text-white hover:scale-105 shadow-amber-300 cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isTranscribing ? "Transcribiendo..." : "Transcribir"}
              </button>

              {error && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {error}
                </div>
              )}
            </div>

            {/* Cuadro Derecho - Texto Transcrito */}
            <div className="bg-white border-4 border-amber-300 rounded-2xl p-8 flex flex-col h-[500px]">
              <h2 className="text-2xl font-bold text-amber-900 mb-4 flex-shrink-0">Transcripción</h2>
              
              <div className="flex-1 overflow-y-auto pr-2">
                {isTranscribing ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-900 mb-4"></div>
                    <p className="text-xl text-amber-900 font-semibold animate-pulse">
                      Transcribiendo...
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Por favor espera, esto puede tomar unos momentos
                    </p>
                  </div>
                ) : transcribedText ? (
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap font-serif text-gray-800 leading-relaxed">
                      {transcribedText}
                    </pre>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <p className="text-center">
                      El texto transcrito aparecerá aquí
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TranscribirPage;
