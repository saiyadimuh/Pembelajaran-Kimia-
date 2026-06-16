import React, { useState } from 'react';
import { LESSONS } from '../data';
import { Lesson } from '../types';
import { BookOpen, Check, Clock, ChevronRight, ArrowLeft, Award, ThumbsUp, Library } from 'lucide-react';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';

interface MaterialsListProps {
  completedLessons: string[];
  onCompleteLesson: (lessonId: string) => void;
}

export default function MaterialsList({ completedLessons, onCompleteLesson }: MaterialsListProps) {
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const activeLesson = LESSONS.find(l => l.id === selectedLessonId) || null;

  // Group lessons by Bab for tidy categorized listing
  const babs = [
    { id: "bab1", title: "Bab 1: Kimia Hijau dalam Pembangunan Berkelanjutan" },
    { id: "bab2", title: "Bab 2: Struktur Atom & Sistem Periodik Unsur" },
    { id: "bab3", title: "Bab 3: Hukum Dasar Kimia dalam Kehidupan" }
  ];

  const getLessonsInBab = (babId: string) => {
    return LESSONS.filter(l => l.babId === babId);
  };

  const handleBack = () => {
    setSelectedLessonId(null);
  };

  const currentLessonIdx = LESSONS.findIndex(l => l.id === selectedLessonId);

  const handleNextLesson = () => {
    if (currentLessonIdx !== -1 && currentLessonIdx + 1 < LESSONS.length) {
      setSelectedLessonId(LESSONS[currentLessonIdx + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSelectedLessonId(null);
    }
  };

  return (
    <div id="materials_list_module" className="max-w-4xl mx-auto">
      {/* 1. LESSON DIRECTORY LIST */}
      {!selectedLessonId && (
        <div className="space-y-8 font-sans">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2 justify-center md:justify-start">
              <Library className="w-5.5 h-5.5 text-indigo-600" />
              Modul Pembelajaran Kimia Fase E (Kelas X)
            </h3>
            <p className="text-sm text-slate-500 mt-1">Kurikulum Merdeka menekankan pemahaman konsep kontekstual dan aksi lingkungan nyata.</p>
          </div>

          <div className="space-y-6">
            {babs.map((bab) => {
              const babLessons = getLessonsInBab(bab.id);
              const completedCount = babLessons.filter(l => completedLessons.includes(l.id)).length;
              const isBabCompleted = completedCount === babLessons.length;

              return (
                <div key={bab.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-3xs space-y-4">
                  {/* Category Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-100/70 gap-2 font-sans">
                    <div>
                      <h4 className="text-base font-extrabold text-slate-800 font-sans">{bab.title}</h4>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <span className={`px-2.5 py-0.5 rounded-full ${
                        isBabCompleted 
                          ? 'bg-emerald-50 text-emerald-600' 
                          : 'bg-indigo-50 text-indigo-600'
                      }`}>
                        Selesai: {completedCount} / {babLessons.length} Modul
                      </span>
                    </div>
                  </div>

                  {/* Lessons Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {babLessons.map((lesson) => {
                      const isCompleted = completedLessons.includes(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setSelectedLessonId(lesson.id)}
                          className="text-left p-4 rounded-2xl bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-indigo-100 hover:shadow-xs hover:scale-[1.01] transition duration-200 flex items-start gap-3.5 group cursor-pointer"
                        >
                          {/* Left Checked marker */}
                          <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center border transition duration-200 ${
                            isCompleted 
                              ? 'bg-emerald-50 border-emerald-100 text-emerald-600' 
                              : 'bg-white border-slate-200 text-slate-400 group-hover:border-indigo-200 group-hover:text-indigo-500'
                          }`}>
                            {isCompleted ? <Check className="w-4.5 h-4.5 stroke-[3]" /> : <BookOpen className="w-4 h-4" />}
                          </div>

                          {/* Detail summary text */}
                          <div className="space-y-1.5 flex-1 min-w-0 font-sans">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase font-mono">
                                {lesson.badge}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1 shrink-0">
                                <Clock className="w-3 h-3" />
                                {lesson.duration}
                              </span>
                            </div>
                            <h5 className="text-xs font-bold text-slate-700 font-sans leading-snug group-hover:text-indigo-600 transition truncate">
                              {lesson.title}
                            </h5>
                            <p className="text-[11px] text-slate-400 font-sans leading-normal line-clamp-1">
                              {lesson.description}
                            </p>
                          </div>

                          <ChevronRight className="w-4 h-4 shrink-0 text-slate-300 group-hover:text-indigo-500 mt-4 transition duration-200" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. READING MODE VIEW */}
      {selectedLessonId && activeLesson && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-2xs space-y-6">
          {/* Reader Top bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <button
              onClick={handleBack}
              className="py-1.5 px-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-150 text-slate-600 rounded-xl text-xs font-semibold hover:border-slate-300 transition duration-200 flex items-center gap-1.5 cursor-pointer"
              id="back_to_lessons_btn"
            >
              <ArrowLeft className="w-4 h-4" />
              Daftar Modul
            </button>
            <div className="text-right text-xs font-mono text-slate-400">
              {activeLesson.babTitle}
            </div>
          </div>

          {/* Lesson Metadata Banner */}
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2">
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-sans">
                {activeLesson.badge}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5" /> Est. {activeLesson.duration}
              </span>
            </div>
            
            <h2 className="text-xl md:text-2xl font-black text-slate-800 leading-tight font-sans">
              {activeLesson.title}
            </h2>
          </div>

          <hr className="border-slate-100" />

          {/* Markdown Content Area */}
          <div className="markdown-body prose prose-slate max-w-none text-slate-600 font-sans leading-relaxed text-sm space-y-5">
            <ReactMarkdown>{activeLesson.content}</ReactMarkdown>
          </div>

          {/* Mark Completed Section */}
          <div className="pt-6 border-t border-slate-150 flex flex-col items-center text-center space-y-4">
            {completedLessons.includes(activeLesson.id) ? (
              <div className="bg-emerald-50 text-emerald-800 p-5 rounded-2xl border border-emerald-150 max-w-md space-y-2 font-sans">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-2xs">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold font-sans">Hebat! Modul ini Telah Anda Kuasai</h4>
                <p className="text-[11px] leading-relaxed font-sans opacity-95">Materi ini berhasil ditandai selesai. Melajulah ke modul belajar berikutnya untuk melengkapi indikator progres Anda!</p>
                
                <button
                  onClick={handleNextLesson}
                  className="mt-3 py-2 px-5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold rounded-xl transition duration-200 shadow-2xs cursor-pointer inline-flex items-center gap-1"
                >
                  {currentLessonIdx + 1 < LESSONS.length ? "Lanjut ke Modul Berikutnya" : "Kembali ke Beranda"}
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-3 font-sans w-full max-w-md">
                <p className="text-xs text-slate-400 leading-relaxed font-sans">Selesaikan membaca seluruh literatur di atas sebelum menandai modul ini sebagai selesai.</p>
                <button
                  onClick={() => onCompleteLesson(activeLesson.id)}
                  className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold hover:shadow-md transition duration-250 cursor-pointer inline-flex items-center justify-center gap-1.5 active:scale-98 shadow-xs"
                  id="mark_lesson_done_btn"
                >
                  <ThumbsUp className="w-4 h-4" />
                  Saya Paham &amp; Tandai Selesai
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
