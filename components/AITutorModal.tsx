
import React, { useState, useEffect } from 'react';
import { askAITutor } from '../services/geminiService';

interface AITutorModalProps {
  question: string;
  userAnswer: string;
  isOpen: boolean;
  onClose: () => void;
}

const AITutorModal: React.FC<AITutorModalProps> = ({ question, userAnswer, isOpen, onClose }) => {
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      handleAsk();
    }
  }, [isOpen]);

  const handleAsk = async () => {
    setLoading(true);
    const result = await askAITutor(question, userAnswer);
    setResponse(result || "哎呀，老師連線斷掉了...");
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
        <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <h3 className="font-bold">AI 數學小老師</h3>
          </div>
          <button onClick={onClose} className="hover:bg-indigo-700 p-1 rounded transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="mb-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">正在討論的題目</p>
            <p className="text-gray-700 italic border-l-4 border-gray-200 pl-3 mt-1">"{question}"</p>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 text-blue-900 border border-blue-100">
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
                <p>老師正在思考怎麼教你...</p>
              </div>
            ) : (
              <div className="whitespace-pre-wrap leading-relaxed">
                {response}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
          >
            知道了，謝謝老師！
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITutorModal;
