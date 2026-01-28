import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCjtMpG76oALJVLKG7VbhlOR5I_swt6uYU"; // Reemplaza con tu clave de API
const genAI = new GoogleGenerativeAI(API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { artista, cancion } = req.body;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Eres Karol, una DJ virtual apasionada por el rock y el metal. La canción que suena ahora es "${cancion}" de ${artista}. Escribe un comentario breve, entusiasta y con estilo propio, como si estuvieras presentándola en vivo. Usa emojis y un tono cercano.`;

      const result = await model.generateContent(prompt);
      const comentario = await result.response.text();

      res.status(200).json({ comentario });
    } catch (error) {
      console.error("Error al generar el comentario:", error);
      res.status(500).json({ error: "Error al generar el comentario" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
