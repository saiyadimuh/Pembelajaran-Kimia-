import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("Warning: GEMINI_API_KEY is not defined in the environment. AI features will fail back gracefully.");
}

// API endpoint to solve chemistry questions
app.post("/api/solve-question", async (req: Request, res: Response) => {
  const { question } = req.body;

  if (!question || typeof question !== "string") {
    return res.status(400).json({ error: "Pertanyaan tidak boleh kosong dan harus berupa teks." });
  }

  if (!ai) {
    return res.status(500).json({ 
      error: "Fitur AI saat ini belum dikonfigurasi. Harap tentukan GEMINI_API_KEY di pengaturan rahasia AI Studio.",
      fallback: "Konfigurasi API Key diperlukan untuk rincian pembahasan bertenaga kecerdasan buatan."
    });
  }

  try {
    const prompt = `Anda adalah seorang Guru Kimia SMA Kelas X yang sangat ramah, suportif, dan ahli dalam Kurikulum Merdeka Indonesia.
Tolong bantu jawab pertanyaan kimia berikut dengan penjelasan yang sangat mendetail, interaktif, dan mudah dimengerti anak remaja berusia 15-16 tahun.

Pertanyaan dari Siswa:
"${question}"

Format jawaban harus berstruktur rapi dalam Bahasa Indonesia menggunakan Markdown, yang berisi:
1. **🔍 Konsep Dasar**: Jelaskan konsep teoretis utama di balik pertanyaan tersebut (misal: Hukum Lavoisier, prinsip kimia hijau, konfigurasi elektron Bohr, dll) secara ringan dan menarik.
2. **✍️ Pembahasan Langkah Demi Langkah**: Pecah cara penyelesaian atau analisis menjadi langkah-langkah logis yang diberi nomor yang sangat berurutan. Jika ada perhitungan matematika kimia (stoikiometri), jelaskan asal-usul angkanya secara detail.
3. **🎯 Kesimpulan Akhir**: Ringkas jawaban akhir dalam 1-2 kalimat tebal yang mudah diingat.
4. **💡 Tips Belajar (Jembatan Keledai / Trivia)**: Berikan cara asyik mengingat materi tersebut atau fakta menarik terkait kehidupan sehari-hari (misal: "Ingat cara menyetarakan reaksi kimia dengan mendahulukan atom selain O dan H!").

Gunakan simbol-simbol kimia yang bersih (contoh: H₂O, CO₂, ²³₁₁Na) atau rumus kimia yang terformat dengan baik dalam markdown agar enak dibaca. Hindari penjelasan yang terlalu formal yang membosankan. Berikan apresiasi semangat di awal tanggapan Anda rasa senang membantu belajar kimia!`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const answer = response.text || "Mohon maaf, Guru AI mengalami kendala dalam merumuskan jawaban. Coba tanyakan lagi.";
    res.json({ success: true, answer });

  } catch (error: any) {
    console.error("Gemini Error:", error);
    res.status(500).json({ 
      error: "Gagal berinteraksi dengan layanan penjelasan AI.", 
      message: error.message || "Unknown error occurred" 
    });
  }
});

// Start server with Vite integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // For React/Vite client SPA routing
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Chemistry Premium Server] Running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

startServer();
