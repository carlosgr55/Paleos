import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
  try {
    console.log("Iniciando transcripción...");
    
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      console.log("Error: No se proporcionó archivo");
      return NextResponse.json(
        { error: "No se proporcionó ningún archivo" },
        { status: 400 }
      );
    }

    console.log("Archivo recibido:", file.name, file.type);

    // Validar formato de archivo
    const validTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      console.log("Error: Formato no válido:", file.type);
      return NextResponse.json(
        { error: "Formato de archivo no válido" },
        { status: 400 }
      );
    }

    // Inicializar Gemini
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.log("Error: API key no configurada");
      return NextResponse.json(
        { error: "API key no configurada" },
        { status: 500 }
      );
    }

    console.log("API key encontrada, inicializando Gemini...");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Convertir archivo a buffer
    console.log("Convirtiendo archivo a buffer...");
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Preparar el prompt
    const prompt = `Actúa como un experto paleógrafo. Transcribe el texto de esta imagen 
    procedente de la Nueva España del siglo XVI. 
    1. Proporciona una transcripción diplomática (fiel al original).
    2. Desarrolla las abreviaturas entre paréntesis.
    3. Si una palabra es ilegible, coloca [ilegible].

    Transcribe fielmente este manuscrito histórico en español del siglo XVI.
    Reglas:

    - Mantén ortografía original
    - Mantén saltos de línea
    - No modernices el texto
    - No agregues texto que no exista
    - Si algo es ilegible, escribe [ilegible]
    - Regresa solo el texto transcrito, sin explicaciones ni comentarios adicionales.
    `;

    let result;

    // Manejar archivos de imagen
    if (file.type.startsWith("image/")) {
      console.log("Procesando imagen...");
      const imagePart = {
        inlineData: {
          data: buffer.toString("base64"),
          mimeType: file.type,
        },
      };

      console.log("Llamando a Gemini API...");
      result = await model.generateContent([prompt, imagePart]);
      console.log("Respuesta recibida de Gemini");
    } else {
      // Para PDFs, necesitamos convertirlos a imágenes primero
      // Por ahora, retornamos un mensaje indicando que PDF requiere procesamiento adicional
      return NextResponse.json(
        { error: "El soporte para PDF estará disponible próximamente. Por favor usa imágenes (JPG, PNG)." },
        { status: 400 }
      );
    }

    const response = await result.response;
    const transcription = response.text();

    console.log("Transcripción exitosa");
    return NextResponse.json({ transcription });
  } catch (error: any) {
    console.error("Error detallado en transcripción:", error);
    console.error("Tipo de error:", error?.constructor?.name);
    console.error("Mensaje:", error?.message);
    console.error("Stack:", error?.stack);
    
    return NextResponse.json(
      { 
        error: "Error al procesar la transcripción",
        details: error?.message || "Error desconocido"
      },
      { status: 500 }
    );
  }
}
