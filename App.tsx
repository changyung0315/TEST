
import React, { useState } from 'react';
import { AppMode, ExamPaper, Section } from './types';
import { EXAM_DATA, GRADE_3_TOPICS } from './constants';
import QuestionCard from './components/QuestionCard';
import { generateQuizByTopic } from './services/geminiService';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.PRACTICE);
  const [currentPaperId, setCurrentPaperId] = useState<string>('paperA');
  const [aiGeneratedPaper, setAiGeneratedPaper] = useState<ExamPaper | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(GRADE_3_TOPICS[0]);

  const currentPaper = mode === AppMode.AI_GENERATE && aiGeneratedPaper 
    ? aiGeneratedPaper 
    : EXAM_DATA[currentPaperId];

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    const questions = await generateQuizByTopic(selectedTopic);
    if (questions) {
      setAiGeneratedPaper({
        id: 'ai-paper',
        title: `AI 特訓卷：${selectedTopic}`,
        sections: [{ name: "AI 生成題目", questions }]
      });
      setMode(AppMode.AI_GENERATE);
    }
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-64 bg-indigo-600 -z-10 rounded-b-[4rem] shadow-2xl"></div>
      
      <div className="max-w-4xl mx-auto px-4 pt-12">
        {/* Header Section */}
        <header className="text-center mb-10 text-white">
          <div className="inline-block p-4 bg-white/20 backdrop-blur-md rounded-3xl mb-4">
             <span className="text-5xl">🎒</span>
          </div>
          <h1 className="text-4xl font-black mb-2 tracking-tight">國小三年級數學特訓班</h1>
          <p className="text-indigo-100 font-medium">翰林/康軒版同步．AI 智能輔導</p>
        </header>

        {/* Navigation Bar */}
        <div className="bg-white p-2 rounded-2xl shadow-xl mb-8 flex flex-col md:flex-row gap-2">
          <div className="flex flex-1 p-1 bg-slate-100 rounded-xl">
            <button 
              onClick={() => { setMode(AppMode.PRACTICE); setCurrentPaperId('paperA'); }}
              className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all ${mode === AppMode.PRACTICE && currentPaperId === 'paperA' ? 'bg-white shadow-md text-indigo-600 scale-100' : 'text-slate-500 hover:text-indigo-500'}`}
            >
              基礎練習 (A)
            </button>
            <button 
              onClick={() => { setMode(AppMode.PRACTICE); setCurrentPaperId('paperB'); }}
              className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all ${mode === AppMode.PRACTICE && currentPaperId === 'paperB' ? 'bg-white shadow-md text-indigo-600 scale-100' : 'text-slate-500 hover:text-indigo-500'}`}
            >
              挑戰進階 (B)
            </button>
          </div>
          <div className="flex-shrink-0 p-1 bg-indigo-50 rounded-xl flex gap-2">
            <select 
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="bg-transparent text-indigo-700 font-bold px-4 py-3 outline-none cursor-pointer"
            >
              {GRADE_3_TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <button 
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition flex items-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : "✨ AI 出題"}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-12 animate-fade-in">
          {currentPaper ? (
            <>
              <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4">
                <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                   <span className="p-2 bg-amber-100 rounded-lg">📄</span>
                   {currentPaper.title}
                </h2>
                <div className="text-slate-400 text-sm font-bold bg-slate-100 px-3 py-1 rounded-full">
                  共 {currentPaper.sections.reduce((acc, s) => acc + s.questions.length, 0)} 題
                </div>
              </div>

              {currentPaper.sections.map((section, sIndex) => (
                <div key={sIndex}>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-8 w-1.5 bg-indigo-500 rounded-full"></div>
                    <h3 className="text-xl font-black text-indigo-600 uppercase tracking-wide">
                      {section.name}
                    </h3>
                  </div>
                  {section.questions.map((q, qIndex) => (
                    <QuestionCard 
                      key={q.id} 
                      question={q} 
                      index={qIndex} 
                    />
                  ))}
                </div>
              ))}
            </>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border-2 border-dashed border-slate-200">
               <span className="text-6xl block mb-4">🚀</span>
               <p className="text-slate-500 font-bold">點擊上方按鈕，開始你的數學冒險吧！</p>
            </div>
          )}
        </div>

        {/* Floating Footer */}
        <footer className="mt-20 py-8 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg border border-slate-100">
             <span className="text-pink-500">❤️</span>
             <span className="text-slate-600 font-bold">小朋友加油，每天練習一點點就會變厲害！</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
