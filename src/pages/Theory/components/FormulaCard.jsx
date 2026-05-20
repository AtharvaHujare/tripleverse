import { useState } from 'react';
import { motion } from 'framer-motion';
import { BlockMath } from 'react-katex';

const FormulaCard = ({ title, math, desc }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(math);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="relative p-6 my-8 rounded-xl bg-black/60 border border-[var(--color-neon-cyan)]/30 shadow-[0_0_15px_rgba(0,255,255,0.1)] hover:shadow-[0_0_25px_rgba(0,255,255,0.2)] transition-all overflow-hidden group"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-neon-cyan)] to-[var(--color-electric-blue)]"></div>
      
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-xl font-bold text-[var(--color-neon-cyan)]">{title}</h4>
        <button 
          onClick={handleCopy}
          className="text-xs px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-gray-300 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy LaTeX'}
        </button>
      </div>
      
      <div className="text-2xl py-4 overflow-x-auto text-white flex justify-center">
        <BlockMath math={math} />
      </div>
      
      {desc && <p className="text-sm text-gray-400 mt-4 text-center">{desc}</p>}
    </motion.div>
  );
};

export default FormulaCard;
