import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlockMath } from 'react-katex';
import { questions } from '../../data/practiceQuestions';
import { recordAttempt } from '../../services/db';

const QuestionView = ({ questionId, onBack, onSolved }) => {
  const question = questions.find(q => q.id === questionId);
  
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct', 'wrong'
  
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [visibleStep, setVisibleStep] = useState(0);
  
  // Timer State
  const [startTime] = useState(Date.now());

  if (!question) return <div className="text-white text-center py-20">Question not found.</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    const timeTaken = Math.floor((Date.now() - startTime) / 1000); // in seconds

    // Simplified checking logic. In a real app, this would be more robust or evaluated via an engine.
    const isCorrect = userAnswer.trim() === question.answer || userAnswer.trim().replace(/\s/g, '') === question.answer.replace(/\s/g, '');
    
    // Save to Database
    recordAttempt(question.id, question.topicId, isCorrect, timeTaken);

    if (isCorrect) {
      setFeedback('correct');
      onSolved();
    } else {
      setFeedback('wrong');
    }
  };

  const handleShowSolution = () => {
    setShowSolution(true);
    // Automatically animate steps one by one
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setVisibleStep(step);
      if (step >= question.solutionSteps.length) {
        clearInterval(interval);
      }
    }, 800); // 800ms delay between steps
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-6 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors"
        >
          <span>←</span> Back to Topic
        </button>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded bg-gray-800 text-gray-300 border border-gray-700 text-xs font-bold">
            {question.marks} Marks
          </span>
          <span className="px-3 py-1 rounded bg-[var(--color-electric-blue)]/20 text-[var(--color-neon-cyan)] border border-[var(--color-electric-blue)] text-xs font-bold shadow-[0_0_10px_rgba(0,255,255,0.2)]">
            {question.xp} XP
          </span>
        </div>
      </div>

      <div className="glass-card p-8 md:p-12 relative overflow-hidden border border-gray-700 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-[var(--color-electric-blue)] to-[var(--color-neon-pink)]"></div>
        
        {/* Question Statement */}
        <h2 className="text-2xl text-gray-300 mb-6">{question.statement}</h2>
        <div className="text-3xl text-[var(--color-neon-cyan)] flex justify-center py-8 mb-10 overflow-x-auto bg-black/40 rounded-xl border border-gray-800/50 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
          <BlockMath math={question.math} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-10">
          <button 
            onClick={() => setShowHint(!showHint)}
            className="px-6 py-3 rounded-lg font-bold border border-yellow-500/50 text-yellow-400 bg-yellow-500/10 hover:bg-yellow-500/20 transition-all"
          >
            {showHint ? 'Hide Hint' : '💡 Need a Hint?'}
          </button>
          <button 
            onClick={() => setShowAnswer(!showAnswer)}
            className="px-6 py-3 rounded-lg font-bold border border-purple-500/50 text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 transition-all"
          >
            {showAnswer ? 'Hide Answer' : '👁️ Reveal Answer'}
          </button>
          {!showSolution && (
            <button 
              onClick={handleShowSolution}
              className="px-6 py-3 rounded-lg font-bold border border-blue-500/50 text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 transition-all ml-auto"
            >
              📖 View Detailed Solution
            </button>
          )}
        </div>

        <AnimatePresence>
          {/* Hint Section */}
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="p-6 bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-lg text-yellow-100">
                <span className="font-bold block mb-2 text-yellow-400">HINT:</span>
                {question.hint}
              </div>
            </motion.div>
          )}

          {/* Reveal Answer Section */}
          {showAnswer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="p-6 bg-purple-900/20 border border-purple-500/30 rounded-lg flex flex-col items-center justify-center shadow-[0_0_20px_rgba(138,43,226,0.1)]">
                <span className="text-gray-400 text-sm mb-2 uppercase tracking-widest">Final Answer</span>
                <div className="text-2xl text-[var(--color-neon-purple)]">
                  <BlockMath math={question.answer} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Area (Hidden if solution is shown to encourage reading) */}
        {!showSolution && (
          <form onSubmit={handleSubmit} className="mt-8 pt-8 border-t border-gray-800">
            <label className="block text-gray-400 mb-3 text-sm font-bold uppercase tracking-wider">Submit Your Answer</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text" 
                value={userAnswer}
                onChange={(e) => {
                  setUserAnswer(e.target.value);
                  setFeedback(null);
                }}
                placeholder="Type your final expression here..."
                className="flex-1 bg-black/60 border border-gray-700 rounded-lg px-6 py-4 text-white text-lg focus:outline-none focus:border-[var(--color-neon-cyan)] transition-colors shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
              />
              <button 
                type="submit"
                className="px-8 py-4 rounded-lg font-bold text-black bg-gradient-to-r from-[var(--color-electric-blue)] to-[var(--color-neon-cyan)] hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(0,255,255,0.4)]"
              >
                Submit
              </button>
            </div>
            
            <AnimatePresence>
              {feedback === 'correct' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 p-4 rounded-lg bg-green-900/30 border border-green-500/50 flex flex-col items-center justify-center gap-3 text-green-400 shadow-[0_0_15px_rgba(0,255,0,0.1)]"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🎉</span>
                    <span className="font-bold text-lg">Correct! Mastery Saved.</span>
                  </div>
                  <button onClick={onBack} className="mt-2 px-6 py-2 bg-green-500/20 hover:bg-green-500/40 text-green-300 rounded-lg transition-colors border border-green-500/50">
                    Return to Topic to Unlock Next
                  </button>
                </motion.div>
              )}
              {feedback === 'wrong' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 p-4 rounded-lg bg-red-900/30 border border-red-500/50 flex items-center justify-center gap-3 text-red-400"
                >
                  <span className="text-2xl">❌</span>
                  <span className="font-bold">Incorrect. Try again or check the hint!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        )}

        {/* Detailed Solution Engine */}
        <AnimatePresence>
          {showSolution && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 pt-8 border-t border-gray-800"
            >
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-[var(--color-electric-blue)]">
                <span>⚙️</span> Step-by-Step Solution Engine
              </h3>
              
              <div className="space-y-6">
                {question.solutionSteps.map((step, index) => (
                  <AnimatePresence key={index}>
                    {visibleStep > index && (
                      <motion.div
                        initial={{ opacity: 0, x: -20, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: 'auto' }}
                        transition={{ duration: 0.5 }}
                        className="relative pl-10 overflow-hidden"
                      >
                        {/* Neon Line Connector */}
                        <div className="absolute left-4 top-0 bottom-[-24px] w-0.5 bg-[var(--color-neon-pink)]/30"></div>
                        
                        {/* Step Marker */}
                        <div className="absolute left-1.5 top-1.5 w-5 h-5 rounded-full bg-[var(--color-neon-pink)] shadow-[0_0_10px_var(--color-neon-pink)] flex items-center justify-center text-xs font-bold text-black z-10">
                          {index + 1}
                        </div>
                        
                        <div className="bg-black/40 border border-gray-800 rounded-xl p-6 mb-6">
                          <p className="text-gray-300 mb-4">{step.text}</p>
                          {step.math && (
                            <div className={`p-4 rounded-lg overflow-x-auto ${index === question.solutionSteps.length - 1 ? 'bg-green-900/20 border border-green-500/50 shadow-[0_0_20px_rgba(0,255,0,0.1)] text-[var(--color-neon-green)]' : 'bg-gray-900/50 border border-gray-700 text-[var(--color-electric-blue)]'}`}>
                              <BlockMath math={step.math} />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
              </div>
              
              {visibleStep >= question.solutionSteps.length && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-10 text-center"
                >
                  <p className="text-gray-400 mb-4">Solution analysis complete.</p>
                  <button 
                    onClick={onBack}
                    className="px-8 py-3 rounded-lg font-bold text-black bg-[var(--color-neon-cyan)] hover:bg-white transition-all shadow-[0_0_15px_var(--color-neon-cyan)]"
                  >
                    Return to Question List
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default QuestionView;
