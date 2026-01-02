
import React, { useState } from 'react';
import { Question } from '../types';
import AITutorModal from './AITutorModal';

interface QuestionCardProps {
  question: Question;
  index: number;
  onAnswerChange?: (id: string, val: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, index, onAnswerChange }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUserAnswer(val);
    setFeedback(null); // Reset feedback when user typing
    if (onAnswerChange) onAnswerChange(question.id, val);
  };

  const handleConfirm = () => {
    if (!userAnswer.trim()) return;
    
    // Simple normalization for comparison: remove spaces and compare
    const normalizedUser = userAnswer.trim().replace(/\s+/g, '');
    const normalizedCorrect = question.answer.trim().replace(/\s+/g, '');
    
    if (normalizedUser === normalizedCorrect) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  return (
    <div className={`bg-white p-6 mb-6 rounded-2xl shadow-sm border-2 transition-all relative group ${
      feedback === 'correct' ? 'border-emerald-400 bg-emerald-50/30' : 
      feedback === 'incorrect' ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200'
    }`}>
      <div className="flex items-start gap-4 mb-4">
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black text-lg transition-colors ${
          feedback === 'correct' ? 'bg-emerald-500 text-white' : 
          feedback === 'incorrect' ? 'bg-rose-500 text-white' : 'bg-indigo-50 text-indigo-600'
        }`}>
          {feedback === 'correct' ? '✓' : feedback === 'incorrect' ? '✕' : index + 1}
        </div>
        <div className="flex-1">
          <h3 className="text-gray-800 text-lg font-bold leading-snug">{question.text}</h3>
        </div>
      </div>
      
      <div className="pl-14 space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="請輸入你的答案..." 
              className={`w-full p-4 border-2 rounded-xl focus:outline-none transition-all text-lg font-medium ${
                feedback === 'correct' ? 'border-emerald-500 bg-white' : 
                feedback === 'incorrect' ? 'border-rose-400 bg-white' : 'bg-slate-50 border-transparent focus:border-indigo-400 focus:bg-white'
              }`}
              value={userAnswer}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === 'Enter' && handleConfirm()}
            />
          </div>
          <button 
            onClick={handleConfirm}
            disabled={!userAnswer.trim()}
            className="px-6 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-100"
          >
            確認
          </button>
        </div>

        {feedback && (
          <div className={`text-sm font-bold animate-fade-in ${feedback === 'correct' ? 'text-emerald-600' : 'text-rose-600'}`}>
            {feedback === 'correct' ? '✨ 太棒了！你答對囉！' : '✍️ 好像不太對喔，再檢查看看？'}
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-2">
          <button 
            onClick={() => setShowAnswer(!showAnswer)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition flex items-center gap-2 ${showAnswer ? 'bg-slate-200 text-slate-600' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
          >
            {showAnswer ? "隱藏解析" : "🔍 查看解答與解析"}
          </button>
          
          <button 
            onClick={() => setIsTutorOpen(true)}
            className="px-5 py-2.5 bg-indigo-100 text-indigo-600 rounded-full text-sm font-bold hover:bg-indigo-200 transition flex items-center gap-2"
          >
            🤖 老師救救我
          </button>
        </div>

        {showAnswer && (
          <div className="p-5 bg-white rounded-2xl text-slate-900 animate-fade-in border border-slate-200 shadow-inner">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-black text-indigo-600">正確答案：</span>
              <span className="text-xl font-bold">{question.answer}</span>
            </div>
            {question.explanation && (
              <div className="flex gap-2">
                <span className="flex-shrink-0 text-amber-500 font-bold">💡 解說：</span>
                <p className="text-sm leading-relaxed text-slate-700 font-medium">{question.explanation}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <AITutorModal 
        question={question.text} 
        userAnswer={userAnswer}
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
      />
    </div>
  );
};

export default QuestionCard;
