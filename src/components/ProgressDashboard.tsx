import React from 'react';
import { LESSONS, QUIZZES } from '../data';
import { UserProgress } from '../types';
import { Award, BookOpen, GraduationCap, CheckCircle, Flame, Target, Compass, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ProgressDashboardProps {
  progress: UserProgress;
  onSetTab: (tabName: string) => void;
}

export default function ProgressDashboard({ progress, onSetTab }: ProgressDashboardProps) {
  const totalLessons = LESSONS.length;
  const completedCount = progress.completedLessons.length;
  const lessonPercentage = Math.round((completedCount / totalLessons) * 100);

  const quizScores = Object.values(progress.quizScores);
  const averageQuizScore = quizScores.length > 0 
    ? Math.round(quizScores.reduce((a, b) => a + b, 0) / QUIZZES.length) 
    : 0;

  const simulatedCount = progress.simulatedElements.length;

  // Badge list based on achievements
  const badgesList = [
    {
      id: "badge_hijau",
      title: "Pahlawan Ekologi",
      condition: progress.completedLessons.includes("l1") && progress.completedLessons.includes("l2"),
      requirement: "Selesaikan semua materi Bab 1: Kimia Hijau",
      icon: "🌱",
      bgColor: "bg-emerald-50 border-emerald-200 text-emerald-800"
    },
    {
      id: "badge_bohr",
      title: "Penjelajah Bohr",
      condition: progress.completedLessons.includes("l3") && progress.completedLessons.includes("l4"),
      requirement: "Selesaikan semua materi Bab 2: Struktur Atom",
      icon: "⚛️",
      bgColor: "bg-indigo-50 border-indigo-200 text-indigo-800"
    },
    {
      id: "badge_stoikiometri",
      title: "Master Neraca Massa",
      condition: progress.completedLessons.includes("l5") && progress.completedLessons.includes("l6"),
      requirement: "Selesaikan semua materi Bab 3: Hukum Dasar Kimia",
      icon: "🧪",
      bgColor: "bg-amber-50 border-amber-200 text-amber-800"
    },
    {
      id: "badge_sim",
      title: "Insinyur Inti Atom",
      condition: simulatedCount >= 2,
      requirement: "Simulasikan minimal 2 unsur kimia berbeda di Simulator Bohr",
      icon: "🛰️",
      bgColor: "bg-sky-50 border-sky-200 text-sky-800"
    },
    {
      id: "badge_quiz",
      title: "Akademisi Kimia",
      condition: Object.values(progress.quizScores).some(score => score >= 85),
      requirement: "Berhasil meraih skor kuis >= 85% di kuis bab mana pun",
      icon: "🏆",
      bgColor: "bg-rose-50 border-rose-200 text-rose-800"
    }
  ];

  const unlockedCount = badgesList.filter(b => b.condition).length;

  return (
    <div id="progress_dashboard_module" className="space-y-8 font-sans">
      {/* 1. KEY METRICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 flex items-center gap-4 shadow-3xs">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-mono block uppercase">Materi Dibaca</span>
            <span className="text-xl font-bold text-slate-800 font-mono block mt-0.5">{completedCount} <span className="text-xs text-slate-400">/ {totalLessons}</span></span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 flex items-center gap-4 shadow-3xs">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-mono block uppercase">Kurikulum Selesai</span>
            <span className="text-xl font-bold text-slate-800 font-mono block mt-0.5">{lessonPercentage}%</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 flex items-center gap-4 shadow-3xs">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-mono block uppercase">Rata-rata Kuis</span>
            <span className="text-xl font-bold text-slate-800 font-mono block mt-0.5">{averageQuizScore}%</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 flex items-center gap-4 shadow-3xs">
          <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
            <Award className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-mono block uppercase font-sans">Lencana Unlocked</span>
            <span className="text-xl font-bold text-slate-800 font-mono block mt-0.5">{unlockedCount} <span className="text-xs text-slate-400">/ {badgesList.length}</span></span>
          </div>
        </div>
      </div>

      {/* 2. PROGRESS SPLIT GRAPHICS AND QUICK ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Card: Progress Radial Status Tracker */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-100 flex flex-col justify-between shadow-3xs">
          <div className="text-center md:text-left">
            <h4 className="font-sans font-bold text-slate-800 text-sm">Status Belajar Saat Ini</h4>
            <p className="text-[11px] text-slate-400 mt-1">Estimasi total capaian fase pembelajaran Kimia Kurikulum Merdeka Kelas X.</p>
          </div>

          {/* SVG Progress Ring */}
          <div className="relative py-6 flex items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle cx="64" cy="64" r="54" stroke="#f1f5f9" strokeWidth="10" fill="transparent" />
              <circle 
                cx="64" 
                cy="64" 
                r="54" 
                stroke="#4f46e5" 
                strokeWidth="10" 
                fill="transparent" 
                strokeDasharray={2 * Math.PI * 54}
                strokeDashoffset={2 * Math.PI * 54 * (1 - lessonPercentage / 100)}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-extrabold font-mono text-slate-800">{lessonPercentage}%</span>
              <span className="text-[9px] text-slate-400 uppercase font-sans">Selesai</span>
            </div>
          </div>

          <div className="text-center">
            <span className="text-xs text-slate-500 block leading-relaxed px-4">
              {lessonPercentage === 100 
                ? "🎉 Sempurna! Anda siap menghadapi ujian kimia sekolah yang sesungguhnya!"
                : "Ayo selesaikan modul membaca sisa, kuis bab rintangan, dan uji model Bohr!"
              }
            </span>
          </div>
        </div>

        {/* Right Card: Quick Launcher */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-100 flex flex-col justify-between shadow-3xs">
          <div>
            <h4 className="font-sans font-bold text-slate-800 text-sm">Navigasi Langsung Belajar</h4>
            <p className="text-[11px] text-slate-400 mt-1">Lanjutkan eksperimen atau asah kemampuan Anda dengan mengklik rute cepat berikut:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
            <button 
              onClick={() => onSetTab('materi')}
              className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 hover:bg-indigo-50 transition text-left cursor-pointer flex flex-col"
            >
              <span className="text-indigo-600 text-lg">📚</span>
              <span className="text-xs font-bold text-slate-800 mt-2 block font-sans">Dasar Teori</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block font-sans">Lanjutkan membaca modul</span>
            </button>

            <button 
              onClick={() => onSetTab('simulasi')}
              className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 hover:bg-sky-50 transition text-left cursor-pointer flex flex-col"
            >
              <span className="text-sky-600 text-lg">⚛️</span>
              <span className="text-xs font-bold text-slate-800 mt-2 block font-sans">Simulator Bohr</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block font-sans">Rakit elektron &amp; inti stabil</span>
            </button>

            <button 
              onClick={() => onSetTab('ai_detect')}
              className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 hover:bg-amber-50 transition text-left cursor-pointer flex flex-col"
            >
              <span className="text-amber-500 text-lg">💡</span>
              <span className="text-xs font-bold text-slate-800 mt-2 block font-sans">Solusi Tugas AI</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block font-sans">Bahasan tugas kimia rinci</span>
            </button>
          </div>

          <div className="text-xs text-slate-400 text-center font-mono">
            Unsur yang pernah dimodelkan: {simulatedCount > 0 ? progress.simulatedElements.join(', ') : "Belum simpan model Bohr"}
          </div>
        </div>
      </div>

      {/* 3. ACHIEVEMENTS & BADGES SHELF */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-3xs space-y-4">
        <div>
          <h4 className="font-sans font-bold text-slate-800 text-[15px] flex items-center gap-1.5 col">
            <Award className="w-5 h-5 text-indigo-600" />
            Lemari Lencana Prestasi Kimia Anda
          </h4>
          <p className="text-xs text-slate-400 mt-1 font-sans">Dapatkan lencana spesial dengan menyelesaikan target belajar yang diatur dalam Kurikulum Merdeka.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {badgesList.map((badge) => {
            return (
              <div 
                key={badge.id}
                className={`p-4 rounded-2xl border-2 text-center flex flex-col items-center justify-between transition duration-200 ${
                  badge.condition 
                    ? `${badge.bgColor} scale-102` 
                    : 'bg-slate-50/50 border-slate-200/60 opacity-50'
                }`}
                title={badge.requirement}
              >
                <div className="text-3xl filter drop-shadow-xs">{badge.icon}</div>
                
                <div className="mt-3 font-sans">
                  <h5 className="font-extrabold text-xs tracking-tight line-clamp-1">{badge.title}</h5>
                  <p className="text-[9px] text-slate-400 leading-snug mt-1 font-sans line-clamp-2">
                    {badge.condition ? "Telah Dicapai! 🎉" : badge.requirement}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
