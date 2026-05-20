import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

// Import all topics
import Introduction from './topics/Introduction';
import Cartesian from './topics/Cartesian';
import Cylindrical from './topics/Cylindrical';
import Spherical from './topics/Spherical';

import 'katex/dist/katex.min.css';

const topicsList = [
  { id: 'intro', title: 'Introduction', component: Introduction },
  { id: 'cartesian', title: 'Cartesian Coordinates', component: Cartesian },
  { id: 'cylindrical', title: 'Cylindrical Coordinates', component: Cylindrical },
  { id: 'spherical', title: 'Spherical Polar Coordinates', component: Spherical }
];

const Theory = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [completedTopics, setCompletedTopics] = useState(new Set());
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const ActiveComponent = topicsList[activeIndex].component;

  // Mark topic as completed when scrolling to bottom
  useEffect(() => {
    const handleScroll = () => {
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (isBottom) {
        setCompletedTopics(prev => new Set(prev).add(activeIndex));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  // Scroll to top when changing topics
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeIndex]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--color-neon-cyan)] origin-left z-50 shadow-[0_0_10px_var(--color-neon-cyan)]"
        style={{ scaleX }}
      />

      <div className="max-w-[1400px] mx-auto px-4 py-8 flex flex-col lg:flex-row gap-10">
        
        {/* Sticky Sidebar Navigation */}
        <div className="lg:w-1/4 hidden lg:block">
          <div className="sticky top-24 glass-card p-6 rounded-2xl border border-gray-800 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <h3 className="text-xl font-bold mb-6 text-[var(--color-electric-blue)] uppercase tracking-widest border-b border-gray-700 pb-3">
              Chapters
            </h3>
            
            <div className="space-y-1">
              {topicsList.map((topic, idx) => {
                const isActive = activeIndex === idx;
                const isCompleted = completedTopics.has(idx);
                
                return (
                  <button
                    key={topic.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all relative group flex items-center justify-between ${
                      isActive 
                        ? 'bg-[var(--color-electric-blue)]/20 text-white border-l-4 border-[var(--color-electric-blue)] shadow-[inset_0_0_20px_rgba(0,255,255,0.1)]' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                    }`}
                  >
                    <span className={`font-medium ${isActive ? 'text-[var(--color-neon-cyan)]' : ''}`}>
                      {topic.title}
                    </span>
                    {isCompleted && !isActive && (
                      <span className="text-[var(--color-neon-green)] text-xs">✓</span>
                    )}
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-[0_0_15px_var(--color-electric-blue)] mix-blend-screen"></div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-800 text-sm text-gray-500">
              <div className="flex justify-between mb-2">
                <span>Progress</span>
                <span className="text-[var(--color-neon-pink)]">
                  {Math.round((completedTopics.size / topicsList.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-1.5">
                <div 
                  className="bg-gradient-to-r from-[var(--color-electric-blue)] to-[var(--color-neon-pink)] h-1.5 rounded-full transition-all duration-500" 
                  style={{ width: `${(completedTopics.size / topicsList.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div className="lg:hidden w-full glass-card p-4 rounded-xl sticky top-20 z-40">
          <select 
            className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-neon-cyan)]"
            value={activeIndex}
            onChange={(e) => setActiveIndex(Number(e.target.value))}
          >
            {topicsList.map((topic, idx) => (
              <option key={topic.id} value={idx}>
                {idx + 1}. {topic.title} {completedTopics.has(idx) ? '✓' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Main Content Area */}
        <div className="lg:w-3/4">
          <div className="glass-card p-6 md:p-12 rounded-3xl border border-[var(--color-electric-blue)]/20 shadow-[0_0_30px_rgba(0,255,255,0.05)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-neon-pink)]/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <ActiveComponent />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons inside content */}
            <div className="mt-16 pt-8 border-t border-gray-800 flex justify-between items-center">
              <button
                onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
                disabled={activeIndex === 0}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  activeIndex === 0 ? 'opacity-30 cursor-not-allowed text-gray-500 bg-gray-900' : 'text-white bg-gray-800 hover:bg-gray-700 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                }`}
              >
                ← Previous
              </button>
              
              <button
                onClick={() => setActiveIndex(prev => Math.min(topicsList.length - 1, prev + 1))}
                disabled={activeIndex === topicsList.length - 1}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  activeIndex === topicsList.length - 1 ? 'opacity-30 cursor-not-allowed text-gray-500 bg-gray-900' : 'text-black bg-[var(--color-electric-blue)] hover:bg-white hover:shadow-[0_0_20px_var(--color-electric-blue)]'
                }`}
              >
                Next Topic →
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Back to Top */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[var(--color-neon-purple)]/80 hover:bg-[var(--color-neon-purple)] text-white flex items-center justify-center shadow-[0_0_15px_var(--color-neon-purple)] transition-all z-40 backdrop-blur-sm"
      >
        ↑
      </button>

    </div>
  );
};

export default Theory;
