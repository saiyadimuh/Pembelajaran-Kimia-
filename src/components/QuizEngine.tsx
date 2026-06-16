import React, { useState } from 'react';
import { QUIZZES } from '../data';
import { QuizQuestion, Quiz } from '../types';
import { Trophy, CheckCircle2, XCircle, ArrowRight, BookOpen, AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface QuizEngineProps {
  completedBabs: { [babId: string]: number };
  onSaveQuizScore: (babId: string, score: number) => void;
}

export default function QuizEngine({ completedBabs, onSaveQuizScore }: QuizEngineProps) {
  const [selectedBabId, setSelectedBabId] = useState<string | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Active quiz selection
  const activeQuiz = QUIZZES.find(q => q.babId === selectedBabId) || null;

  const startQuiz = (babId: string) => {
    setSelectedBabId(babId);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleOptionSelect = (optionIdx: number) => {
    if (isAnswered) return; // Prevent clicking multiple times
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    if (activeQuiz && optionIdx === activeQuiz.questions[currentQuestionIdx].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (!activeQuiz) return;
    
    if (currentQuestionIdx + 1 < activeQuiz.questions.length) {
      setCurrentQuestionIdx(idx => idx + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Finished
      setQuizFinished(true);
      const totalQuestions = activeQuiz.questions.length;
      const finalPercentage = Math.round(( (score + (selectedOption === activeQuiz.questions[currentQuestionIdx].correctAnswer ? 1 : 0)) / totalQuestions) * 100);
      onSaveQuizScore(activeQuiz.babId, finalPercentage);
    }
  };

  const quitQuiz = () => {
    setSelectedBabId(null);
  };

  return (
    <div id="quiz_engine_module" className="max-w-3xl mx-auto">
      {/* 1. QUIZ SELECTOR VIEW */}
      {!selectedBabId && (
        <div className="space-y-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-slate-800 font-sans">Ujian Evaluasi Kimia Kelas X</h3>
            <p className="text-sm text-slate-500 mt-1">Uji pemahaman Anda pada setiap bab Kurikulum Merdeka dan dapatkan skor terbaik!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {QUIZZES.map((quiz) => {
              const prevHighScore = completedBabs[quiz.babId];
              return (
                <div 
                  key={quiz.babId} 
                  className="bg-white rounded-2xl p-6 border border-slate-100 shadow-3xs flex flex-col justify-between hover:shadow-xs transition duration-200"
                  id={`quiz_box_${quiz.babId}`}
                >
                  <div>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase font-sans">
                      {quiz.babId === 'bab1' ? 'Materi 1' : quiz.babId === 'bab2' ? 'Materi 2' : 'Materi 3'}
                    </span>
                    <h4 className="text-base font-bold text-slate-800 mt-3 font-sans leading-tight">{quiz.babTitle}</h4>
                    <p className="text-xs text-slate-400 mt-2 font-sans">{quiz.questions.length} Pertanyaan Pilihan Ganda</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100/60">
                    {prevHighScore !== undefined ? (
                      <div className="flex items-center justify-between text-xs mb-3">
                        <span className="text-slate-400 font-sans">Skor Terbaik:</span>
                        <span className={`font-bold font-mono px-2 py-0.5 rounded-md ${
                          prevHighScore >= 80 ? 'text-emerald-600 bg-emerald-50' : 'text-indigo-600 bg-indigo-50'
                        }`}>
                          {prevHighScore}%
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-xs mb-3 text-slate-400 font-sans">
                        <span>Belum dikerjakan</span>
                        <span>--</span>
                      </div>
                    )}
                    
                    <button
                      onClick={() => startQuiz(quiz.babId)}
                      className="w-full py-2.5 px-4 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition duration-250 flex items-center justify-center gap-1.5 active:scale-98 cursor-pointer shadow-3xs"
                      id={`start_quiz_${quiz.babId}`}
                    >
                      <BookOpen className="w-4 h-4" />
                      Mulai Kuis
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. ACTIVE QUIZ RUNNING VIEW */}
      {selectedBabId && activeQuiz && !quizFinished && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-xs space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold text-indigo-500 font-mono tracking-wider block">KUIS AKTIF</span>
              <h4 className="text-sm font-bold text-slate-700 font-sans truncate max-w-[200px] md:max-w-md">{activeQuiz.babTitle}</h4>
            </div>
            <button 
              onClick={quitQuiz}
              className="text-xs text-slate-400 hover:text-rose-500 font-semibold px-3 py-1.5 rounded-lg hover:bg-slate-50 transition cursor-pointer"
              id="quit_quiz_btn"
            >
              Keluar Kuis
            </button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-500 font-mono">
              <span>Pertanyaan {currentQuestionIdx + 1} dari {activeQuiz.questions.length}</span>
              <span>{Math.round(((currentQuestionIdx) / activeQuiz.questions.length) * 100)}% Selesai</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIdx) / activeQuiz.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Text */}
          <div className="my-6">
            <h3 className="text-base md:text-lg font-bold text-slate-800 font-sans leading-relaxed">
              {activeQuiz.questions[currentQuestionIdx].question}
            </h3>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {activeQuiz.questions[currentQuestionIdx].options.map((option, idx) => {
              const isCorrectOpt = idx === activeQuiz.questions[currentQuestionIdx].correctAnswer;
              const isSelectedOpt = idx === selectedOption;
              
              let optionStyle = "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20";
              if (isAnswered) {
                if (isCorrectOpt) optionStyle = "border-emerald-300 bg-emerald-50/80 text-emerald-900";
                else if (isSelectedOpt) optionStyle = "border-rose-300 bg-rose-50/80 text-rose-900";
                else optionStyle = "border-slate-100 bg-slate-50/45 opacity-60";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl border-2 transition duration-200 flex items-start gap-3 cursor-pointer ${optionStyle}`}
                  id={`opt_${idx}`}
                >
                  <span className={`w-6 h-6 shrink-0 rounded-lg flex items-center justify-center text-xs font-bold font-sans mt-0.5 ${
                    isSelectedOpt 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm font-sans text-slate-700 leading-normal">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Option Explanation Section (Shows immediately once option is chosen) */}
          {isAnswered && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-2xl border flex items-start gap-3 mt-4 ${
                selectedOption === activeQuiz.questions[currentQuestionIdx].correctAnswer
                  ? 'bg-emerald-50/40 border-emerald-100 text-emerald-800'
                  : 'bg-rose-50/40 border-rose-100 text-rose-800'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {selectedOption === activeQuiz.questions[currentQuestionIdx].correctAnswer 
                  ? <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  : <XCircle className="w-5 h-5 text-rose-500" />
                }
              </div>
              <div className="space-y-1">
                <h5 className="text-xs font-bold font-sans">
                  {selectedOption === activeQuiz.questions[currentQuestionIdx].correctAnswer 
                    ? "Jawaban Anda Benar!" 
                    : "Jawaban Belum Tepat"
                  }
                </h5>
                <p className="text-xs leading-relaxed font-sans opacity-95">
                  {activeQuiz.questions[currentQuestionIdx].explanations[selectedOption ?? 0]}
                </p>
                {selectedOption !== activeQuiz.questions[currentQuestionIdx].correctAnswer && (
                  <p className="text-xs font-semibold text-emerald-700 mt-2 font-sans">
                    ✨ Catatan: Kunci jawaban yang benar adalah ({String.fromCharCode(65 + activeQuiz.questions[currentQuestionIdx].correctAnswer)}), karena: {activeQuiz.questions[currentQuestionIdx].explanations[activeQuiz.questions[currentQuestionIdx].correctAnswer]}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* Action Footer */}
          {isAnswered && (
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                onClick={handleNext}
                className="py-2.5 px-6 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition flex items-center gap-1.5 cursor-pointer"
                id="next_q_btn"
              >
                {currentQuestionIdx + 1 === activeQuiz.questions.length ? "Selesaikan Kuis" : "Pertanyaan Selanjutnya"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. FINISHED SCORE RESULTS CARD */}
      {selectedBabId && activeQuiz && quizFinished && (
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center space-y-6"
        >
          <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-500 shadow-sm">
            <Trophy className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-800 font-sans">Kuis Berhasil Diselesaikan!</h3>
            <p className="text-sm text-slate-400 font-sans">Kamu telah menyelesaikan seluruh soal evaluasi untuk {activeQuiz.babTitle}</p>
          </div>

          {/* Big Score Container */}
          <div className="bg-slate-50 rounded-2xl p-6 max-w-sm mx-auto border border-slate-100 font-sans">
            <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold block">Skor Evaluasi</div>
            <div className="text-4xl font-extrabold text-indigo-600 font-mono mt-2">
              {Math.round((score / activeQuiz.questions.length) * 100)}%
            </div>
            <div className="text-xs text-slate-500 mt-2 font-sans font-medium">
              Menjawab benar {score} dari {activeQuiz.questions.length} pertanyaan
            </div>
          </div>

          <div className="flex gap-4 max-w-md mx-auto pt-4">
            <button
              onClick={() => startQuiz(activeQuiz.babId)}
              className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
              id="retry_quiz_btn"
            >
              <RefreshCw className="w-4 h-4" />
              Ulangi Kuis
            </button>
            
            <button
              onClick={quitQuiz}
              className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
              id="finish_back_to_menu"
            >
              Kembali ke Menu
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
