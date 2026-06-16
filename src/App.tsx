import React, { useState, useEffect } from 'react';
import { UserProgress } from './types';
import AtomSimulator from './components/AtomSimulator';
import QuizEngine from './components/QuizEngine';
import AIPortal from './components/AIPortal';
import MaterialsList from './components/MaterialsList';
import ProgressDashboard from './components/ProgressDashboard';
import { 
  FlaskConical, 
  Sparkles, 
  Trophy, 
  BookOpen, 
  Compass, 
  Lightbulb, 
  CheckCircle,
  GraduationCap
} from 'lucide-react';
import { motion } from 'motion/react';

const LOCAL_STORAGE_KEY = 'chemistry_progress_merdeka_v1';

const DEFAULT_PROGRESS: UserProgress = {
  completedLessons: [],
  quizScores: {},
  simulatedElements: []
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [loaded, setLoaded] = useState<boolean>(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setProgress(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Local storage error:", e);
    } finally {
      setLoaded(true);
    }
  }, []);

  // Save progress helper
  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProgress));
    } catch (e) {
      console.error("Failed to write progress to localstorage", e);
    }
  };

  // Callback when a user completes reading a lesson
  const handleCompleteLesson = (lessonId: string) => {
    if (progress.completedLessons.includes(lessonId)) return;
    const updated = {
      ...progress,
      completedLessons: [...progress.completedLessons, lessonId]
    };
    saveProgress(updated);
  };

  // Callback when a user completes a quiz
  const handleSaveQuizScore = (babId: string, percentage: number) => {
    const currentBest = progress.quizScores[babId] || 0;
    if (percentage > currentBest) {
      const updated = {
        ...progress,
        quizScores: {
          ...progress.quizScores,
          [babId]: percentage
        }
      };
      saveProgress(updated);
    }
  };

  // Callback when user simulates an element in Bohr model
  const handleAddSimulatedElement = (symbol: string) => {
    if (progress.simulatedElements.includes(symbol)) return;
    const updated = {
      ...progress,
      simulatedElements: [...progress.simulatedElements, symbol]
    };
    saveProgress(updated);
  };

  if (!loaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <FlaskConical className="w-12 h-12 text-indigo-600 animate-spin" />
          <p className="text-sm font-semibold text-slate-500 font-sans">Memuat Kurikulum Merdeka...</p>
        </div>
      </div>
    );
  }

  // Dynamic gamified learning XP
  const completedLessonsCount = progress.completedLessons.length;
  const quizScoresList = Object.values(progress.quizScores);
  const simulatedCount = progress.simulatedElements.length;
  const totalXP = 420 + (completedLessonsCount * 150) + (simulatedCount * 120) + (quizScoresList.reduce((sum, s) => sum + Math.round(s * 7.5), 0));

  return (
    <div id="chemistry_app_root" className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between">
      {/* 🚀 ELEGANT SLEEK HEADER */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200/80 z-50 shadow-3xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4 font-sans">
          
          {/* Brand Logo Wrapper matching design HTML */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-indigo-100">
              C
            </div>
            <div className="font-sans">
              <span className="text-lg font-extrabold tracking-tight text-slate-800">ChemLab <span className="text-indigo-600">X</span></span>
              <span className="ml-3 px-2 py-0.5 bg-slate-100 rounded text-[9px] font-bold text-slate-500 uppercase tracking-wider inline-block">
                Kurikulum Merdeka
              </span>
            </div>
          </div>

          {/* Tab Navigation Menu */}
          <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200/55 scrollbar-none overflow-x-auto max-w-full">
            {/* Dashboard Button */}
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'bg-white text-indigo-600 shadow-3xs'
                  : 'text-slate-500 hover:text-indigo-600'
              }`}
              id="tab_dashboard_btn"
            >
              <Compass className="w-4 h-4" />
              Progres
            </button>

            {/* Syllabus Button */}
            <button
              onClick={() => setActiveTab('materi')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'materi'
                  ? 'bg-white text-indigo-600 shadow-3xs'
                  : 'text-slate-500 hover:text-indigo-600'
              }`}
              id="tab_materi_btn"
            >
              <BookOpen className="w-4 h-4" />
              Modul
            </button>

            {/* Bohr Simulator Button */}
            <button
              onClick={() => setActiveTab('simulasi')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'simulasi'
                  ? 'bg-white text-indigo-600 shadow-3xs'
                  : 'text-slate-500 hover:text-indigo-600'
              }`}
              id="tab_sim_btn"
            >
              <Lightbulb className="w-4 h-4" />
              Model Bohr
            </button>

            {/* SOLVER AI PANEL Button */}
            <button
              onClick={() => setActiveTab('ai_detect')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'ai_detect'
                  ? 'bg-white text-indigo-600 shadow-3xs'
                  : 'text-slate-500 hover:text-indigo-600'
              }`}
              id="tab_ai_btn"
            >
              <Sparkles className="w-4 h-4" />
              Detektor AI
            </button>

            {/* QUIZZES Button */}
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'quiz'
                  ? 'bg-white text-indigo-600 shadow-3xs'
                  : 'text-slate-500 hover:text-indigo-600'
              }`}
              id="tab_quiz_btn"
            >
              <Trophy className="w-4 h-4" />
              Kuis Evaluasi
            </button>
          </nav>

          {/* Learning XP Points section aligned on top right */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none">Poin Belajar</p>
              <p className="text-sm font-extrabold text-indigo-600 mt-1 font-mono leading-none">{totalXP.toLocaleString('id-ID')} XP</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-100/80 border-2 border-white shadow-2xs flex items-center justify-center overflow-hidden">
              <span className="text-xs font-bold text-indigo-600">MU</span>
            </div>
          </div>

        </div>
      </header>

      {/* 🔮 APPLICATION PRIMARY BODY DISPLAY */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="relative">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              <ProgressDashboard progress={progress} onSetTab={setActiveTab} />
            </motion.div>
          )}

          {/* Materials Read Tab */}
          {activeTab === 'materi' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              <MaterialsList 
                completedLessons={progress.completedLessons} 
                onCompleteLesson={handleCompleteLesson} 
              />
            </motion.div>
          )}

          {/* Interactive Atomic Simulator Tab */}
          {activeTab === 'simulasi' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              <AtomSimulator onAddSimulatedElement={handleAddSimulatedElement} />
            </motion.div>
          )}

          {/* Solves Tasks via Gemini AI Tab */}
          {activeTab === 'ai_detect' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              <AIPortal />
            </motion.div>
          )}

          {/* Quizzes and Marks Evaluator Tab */}
          {activeTab === 'quiz' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              <QuizEngine 
                completedBabs={progress.quizScores} 
                onSaveQuizScore={handleSaveQuizScore} 
              />
            </motion.div>
          )}
        </div>
      </main>

      {/* 🚀 FOOTER PANEL */}
      <footer className="bg-white border-t border-slate-100 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-xs text-slate-400">
          <div className="text-center md:text-left font-sans">
            <p className="font-semibold text-slate-500 font-sans">Aplikasi Interaktif Pembelajaran Kimia Fase E (SMA Kelas X)</p>
            <p className="mt-1 font-sans">Mengikuti Kerangka Capaian Pembelajaran Kurikulum Merdeka Tahun 2024/2026</p>
          </div>
          <div className="flex items-center gap-2 font-sans font-medium text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Local Database Connected</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
