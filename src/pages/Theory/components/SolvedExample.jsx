import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlockMath } from 'react-katex';

const SolvedExample = ({ title, problemMath, steps, finalAnswer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-10 bg-black/40 rounded-xl border border-gray-700/50 overflow-hidden">
      <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/30">
        <div>
          <h4 className="text-xl font-bold text-[var(--color-neon-pink)]">{title}</h4>
          <p className="text-gray-400 text-sm mt-1">Detailed step-by-step solution</p>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="px-6 py-2 rounded-lg font-bold text-sm bg-gray-800 hover:bg-gray-700 transition-colors text-white border border-gray-600"
        >
          {isOpen ? 'Hide Solution' : 'View Solution'}
        </button>
      </div>
      
      <div className="p-8 text-xl flex justify-center text-[var(--color-electric-blue)]">
        <BlockMath math={problemMath} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-gray-950/50 border-t border-gray-800"
          >
            <div className="p-8 space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 text-gray-400 flex items-center justify-center font-bold font-mono text-sm border border-gray-700">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-300 mb-4">{step.desc}</p>
                    {step.math && (
                      <div className="p-4 bg-black/60 rounded-lg border border-gray-800 text-white overflow-x-auto">
                        <BlockMath math={step.math} />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <div className="mt-8 pt-6 border-t border-gray-800 text-center">
                <p className="text-gray-400 mb-2">Final Answer</p>
                <div className="inline-block px-8 py-4 rounded-xl border-2 border-[var(--color-neon-green)] bg-[var(--color-neon-green)]/10 text-2xl text-[var(--color-neon-green)] shadow-[0_0_20px_rgba(57,255,20,0.1)]">
                  <BlockMath math={finalAnswer} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SolvedExample;
