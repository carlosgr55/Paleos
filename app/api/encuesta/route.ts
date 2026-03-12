import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const RESPONSES_FILE = path.join(process.cwd(), "encuestas.json");

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Leer respuestas existentes
    let responses = [];
    if (fs.existsSync(RESPONSES_FILE)) {
      const fileContent = fs.readFileSync(RESPONSES_FILE, "utf-8");
      responses = JSON.parse(fileContent);
    }

    // Agregar nueva respuesta con timestamp
    const newResponse = {
      ...data,
      timestamp: new Date().toISOString(),
    };
    responses.push(newResponse);

    // Guardar en archivo
    fs.writeFileSync(RESPONSES_FILE, JSON.stringify(responses, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al guardar encuesta:", error);
    return NextResponse.json(
      { error: "Error al guardar la encuesta" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Leer respuestas
    if (!fs.existsSync(RESPONSES_FILE)) {
      return NextResponse.json([]);
    }

    const fileContent = fs.readFileSync(RESPONSES_FILE, "utf-8");
    const responses = JSON.parse(fileContent);

    return NextResponse.json(responses);
  } catch (error) {
    console.error("Error al leer encuestas:", error);
    return NextResponse.json(
      { error: "Error al leer las encuestas" },
      { status: 500 }
    );
  }
}
