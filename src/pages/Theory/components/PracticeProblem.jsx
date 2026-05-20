import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlockMath } from 'react-katex';

const PracticeProblem = ({ difficulty, problemMath, solutionMath, answer }) => {
  const [showSolution, setShowSolution] = useState(false);

  const colors = {
    Beginner: 'text-green-400 border-green-400/30 bg-green-400/10',
    Moderate: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
    Advanced: 'text-red-400 border-red-400/30 bg-red-400/10',
  };

  return (
    <div className="my-6 glass-card p-6 border-l-4" style={{ borderLeftColor: difficulty === 'Beginner' ? '#4ade80' : difficulty === 'Moderate' ? '#facc15' : '#f87171' }}>
      <div className="flex justify-between items-start mb-6">
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${colors[difficulty]}`}>
          {difficulty}
        </span>
        <button 
          onClick={() => setShowSolution(!showSolution)}
          className="text-sm font-medium text-[var(--color-electric-blue)] hover:text-white transition-colors underline"
        >
          {showSolution ? 'Hide Answer' : 'Show Answer'}
        </button>
      </div>

      <div className="text-xl overflow-x-auto text-white flex justify-center mb-4">
        <BlockMath math={problemMath} />
      </div>

      <AnimatePresence>
        {showSolution && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mt-6 pt-6 border-t border-gray-800"
          >
            <p className="text-gray-400 text-sm mb-4 uppercase tracking-widest text-center">Solution Steps</p>
            <div className="text-lg overflow-x-auto text-gray-300 flex justify-center mb-6">
              <BlockMath math={solutionMath} />
            </div>
            <div className="text-center font-bold text-[var(--color-neon-pink)] text-xl">
              Final Answer: {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PracticeProblem;
