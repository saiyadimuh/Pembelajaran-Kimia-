import React, { useState } from 'react';
import { Send, Sparkles, BookOpen, Clock, AlertCircle, HelpCircle, GraduationCap, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';

interface AIPortalProps {
  onAddSimulatedElement?: () => void;
}

const TEMPLATE_QUESTIONS = [
  {
    title: "Kimia Hijau",
    desc: "Mengapa penting menerapkan prinsip Kimia Hijau dalam SDGs?",
    text: "Mengapa penerapan prinsip Kimia Hijau dinilai sangat penting dalam mendukung pencapaian tujuan pembangunan berkelanjutan (SDGs) PBB?"
  },
  {
    title: "Struktur Atom",
    desc: "Penjelasan Golongan & Periode unsur Ca (Z = 20)",
    text: "Bagaimana cara menentukan golongan dan periode dari Kalsium dengan nomor atom 20 menggunakan teori konfigurasi elektron Bohr?"
  },
  {
    title: "Teori Klasik",
    desc: "Perbedaan Model Atom Bohr dengan Rutherford",
    text: "Apa perbedaan paling mendasar antara model atom yang diusulkan oleh Ernest Rutherford dengan model atom Niels Bohr?"
  },
  {
    title: "Hukum Dasar",
    desc: "Massa logam Magnesium dibakar dengan oksigen",
    text: "Jika 10 gram logam Magnesium dibakar secara sempurna dalam wadah tertutup menyerap 6 gram gas Oksigen, berapa gram Magnesium Oksida yang terbentuk? Hukum dasar kimia apa yang mendasarinya?"
  }
];

export default function AIPortal({ onAddSimulatedElement }: AIPortalProps) {
  const [question, setQuestion] = useState<string>('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const askTeacherAI = async (textToSend: string) => {
    if (!textToSend.trim()) return;
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('/api/solve-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: textToSend })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal mengirim pertanyaan. Silakan coba lagi.');
      }

      setResponse(data.answer);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Koneksi ke server terputus. Pastikan server dev berjalan.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    askTeacherAI(question);
  };

  const handleTemplateSelect = (text: string) => {
    setQuestion(text);
    askTeacherAI(text);
  };

  return (
    <div id="ai_portal_module" className="space-y-6">
      {/* Introduction Card */}
      <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 rounded-3xl p-6 text-white shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-sans">
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 bg-indigo-800/60 rounded-full inline-block">
              Asisten Belajar Cerdas
            </span>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <GraduationCap className="w-6 h-6 shrink-0" />
              Detektor Rincian Jawaban Kimia AI
            </h3>
            <p className="text-xs text-indigo-100 max-w-xl">
              Butuh penjelasan penyetaraan reaksimu? Bingung menghitung nomor massa? Masukkan soalan kimiamu (teoretis maupun stoikiometri) dan guru AI akan menjawab secara rinci sesuai standar Kurikulum Merdeka!
            </p>
          </div>
          <div className="shrink-0 bg-white/10 p-3 rounded-2xl border border-white/15">
            <Sparkles className="w-10 h-10 text-amber-300 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Solver Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Pane - 4 Columns */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs">
            <h4 className="font-sans font-semibold text-slate-800 text-base mb-4">Tanyakan Soal Kimia Anda</h4>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative font-sans">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ketik soal kimia Anda di sini... (Misal: Setarakan reaksi Na + Cl2 -> NaCl atau Hitung p, n, e dari O-16)"
                  rows={4}
                  className="w-full p-4 text-sm text-slate-700 placeholder-slate-400 bg-slate-50 rounded-2xl border border-slate-150 focus:outline-hidden focus:border-indigo-400 focus:bg-white focus:ring-3 focus:ring-indigo-100 transition duration-200 resize-none font-sans"
                  id="ai_question_input"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !question.trim()}
                className="w-full py-3 px-5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 disabled:opacity-40 transition flex items-center justify-center gap-1.5 active:scale-98 cursor-pointer shadow-3xs"
                id="submit_question_btn"
              >
                {isLoading ? (
                  <>
                    <Clock className="w-4 h-4 animate-spin" />
                    Menyusun Penjelasan...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Tanyakan AI Guru
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick templates wrapper */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs">
            <h4 className="font-sans font-semibold text-slate-800 text-sm mb-3 flex items-center gap-1.5">
              <HelpCircle className="w-4.5 h-4.5 text-indigo-500" />
              Contoh Pertanyaan Populer
            </h4>
            <p className="text-[11px] text-slate-400 mb-4 font-sans">Pilih kartu templat di bawah untuk mendapatkan rincian langsung:</p>
            
            <div className="space-y-3">
              {TEMPLATE_QUESTIONS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTemplateSelect(item.text)}
                  disabled={isLoading}
                  className="w-full text-left p-3 rounded-xl bg-slate-50/50 hover:bg-indigo-50/35 border border-slate-100 hover:border-indigo-200 hover:scale-[1.01] transition duration-200 flex items-start justify-between gap-2 cursor-pointer group"
                  id={`template_item_${idx}`}
                >
                  <div className="font-sans">
                    <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-sm">
                      {item.title}
                    </span>
                    <p className="text-xs font-medium text-slate-700 mt-1.5 line-clamp-2 leading-relaxed font-sans">{item.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 shrink-0 text-slate-300 group-hover:text-indigo-500 mt-0.5 transition duration-200" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output Discussion Pane - 7 Columns */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-100 shadow-xs min-h-[400px] flex flex-col">
          <div className="border-b border-slate-100 pb-3 mb-4 flex justify-between items-center">
            <h4 className="font-sans font-semibold text-slate-800 text-base">Papan Diskusi &amp; Penjelasan Rinci</h4>
            <span className="text-xs text-slate-400 font-mono">Status: {isLoading ? "Menulis..." : "Selesai"}</span>
          </div>

          {/* Discussion Area */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-12 space-y-4">
                <div className="inline-flex relative">
                  <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500 animate-spin border-4 border-indigo-200 border-t-indigo-600"></div>
                </div>
                <div className="space-y-1 max-w-sm mx-auto font-sans">
                  <h5 className="text-sm font-bold text-slate-700 font-sans">Guru AI Kimia Sedang Berpikir...</h5>
                  <p className="text-xs text-slate-400 font-sans">Mengurai persamaan reaksi, merakit koordinat konfigurasi, dan memvalidasi kebenaran literatur.</p>
                </div>
              </div>
            )}

            {/* Error Fallback */}
            {error && (
              <div className="p-5 bg-rose-50 border border-rose-100 rounded-2xl text-center space-y-3 font-sans">
                <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
                <div className="space-y-1">
                  <h5 className="text-sm font-bold text-rose-800 font-sans">Gagal Membaca Pembahasan</h5>
                  <p className="text-xs text-rose-600 font-sans">{error}</p>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !response && !error && (
              <div className="text-center py-12 space-y-3">
                <div className="w-16 h-16 bg-slate-50 border border-dashed border-slate-200 rounded-full flex items-center justify-center text-slate-400 mx-auto">
                  <BookOpen className="w-7 h-7" />
                </div>
                <div className="space-y-1 max-w-xs mx-auto font-sans">
                  <h5 className="text-sm font-bold text-slate-600 font-sans">Papan Masih Kosong</h5>
                  <p className="text-xs text-slate-400 font-sans">Tanyakan soal kimia kelas X apa saja, atau klik contoh pertanyaan populer di panel kiri.</p>
                </div>
              </div>
            )}

            {/* Render AI Response */}
            {!isLoading && response && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4 text-slate-700"
              >
                {/* Visual Header Note */}
                <div className="p-3 bg-emerald-50/50 border border-emerald-100 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2 font-sans mb-3">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
                  <span>Analisis Berhasil: Jawaban diverifikasi oleh Guru AI Kurikulum Merdeka</span>
                </div>

                {/* Markdown Container */}
                <div className="markdown-body text-sm leading-relaxed prose prose-indigo max-w-none text-slate-600 font-sans space-y-4">
                  <ReactMarkdown>{response}</ReactMarkdown>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
