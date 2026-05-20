import { motion } from 'framer-motion';
import { practiceTopics, questions } from '../../data/practiceQuestions';
import { getQuestionState } from '../../services/db';

const TopicView = ({ topicId, onSelectQuestion }) => {
  const topic = practiceTopics.find(t => t.id === topicId);
  const topicQuestions = questions.filter(q => q.topicId === topicId);

  if (!topic) return <div className="text-white text-center py-20">Topic not found.</div>;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-5xl mx-auto"
    >
      <div className="mb-10 p-8 glass-card border-l-4 border-[var(--color-electric-blue)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-electric-blue)]/10 rounded-full blur-2xl"></div>
        <h2 className="text-3xl font-bold text-white mb-2">{topic.title}</h2>
        <p className="text-gray-400">Select a problem to begin. Earn XP and increase your rank.</p>
        
        <div className="flex gap-6 mt-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span className="text-sm text-gray-300">Easy</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="text-sm text-gray-300">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="text-sm text-gray-300">Difficult</span>
          </div>
        </div>
      </div>

      {topicQuestions.length === 0 ? (
        <div className="text-center py-20 glass-card">
          <p className="text-xl text-gray-400">No questions available for this topic yet.</p>
          <p className="text-sm text-gray-500 mt-2">Check back later for updates!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {topicQuestions.map((q, idx) => {
            const state = getQuestionState(q.id);
            const isLocked = state === 'locked';

            return (
              <motion.div
                key={q.id}
                whileHover={!isLocked ? { scale: 1.01, x: 5 } : {}}
                onClick={() => !isLocked && onSelectQuestion(q.id)}
                className={`glass-card p-6 border transition-all flex items-center justify-between group 
                  ${isLocked ? 'border-gray-800 bg-gray-900/40 opacity-60 cursor-not-allowed' : 'cursor-pointer border-gray-700 hover:border-[var(--color-neon-pink)] bg-black/40 hover:bg-black/60'}
                  ${state === 'solved' ? 'border-[var(--color-neon-green)]/50 shadow-[0_0_10px_rgba(74,222,128,0.1)]' : ''}
                  ${state === 'wrong' ? 'border-red-500/50 shadow-[0_0_10px_rgba(248,113,113,0.1)]' : ''}
                `}
              >
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-bold text-xl transition-colors
                    ${isLocked ? 'bg-gray-900 border-gray-800 text-gray-600' : 
                      state === 'solved' ? 'bg-green-900/30 border-green-500/50 text-green-400' :
                      state === 'wrong' ? 'bg-red-900/30 border-red-500/50 text-red-400' :
                      'bg-gray-900 border-gray-700 text-gray-300 group-hover:text-[var(--color-neon-pink)] group-hover:border-[var(--color-neon-pink)]/50'
                    }
                  `}>
                    {state === 'solved' ? '✓' : state === 'wrong' ? '✗' : isLocked ? '🔒' : idx + 1}
                  </div>
                  
                  <div>
                    <h4 className={`text-lg font-bold mb-1 transition-colors
                      ${isLocked ? 'text-gray-500' : 'text-white group-hover:text-[var(--color-electric-blue)]'}
                    `}>Problem #{idx + 1}</h4>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-0.5 rounded border ${
                        q.difficulty === 'Easy' ? 'border-green-500/50 text-green-400 bg-green-500/10' :
                        q.difficulty === 'Medium' ? 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10' :
                        'border-red-500/50 text-red-400 bg-red-500/10'
                      } ${isLocked ? 'opacity-50' : ''}`}>
                        {q.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    {state === 'solved' ? (
                      <p className="text-sm font-bold text-green-400">Mastered</p>
                    ) : state === 'wrong' ? (
                      <p className="text-sm font-bold text-red-400">Retry Needed</p>
                    ) : isLocked ? (
                      <p className="text-sm font-bold text-gray-600">Locked</p>
                    ) : (
                      <p className="text-sm font-bold text-[var(--color-neon-cyan)]">Ready</p>
                    )}
                  </div>
                  {!isLocked && (
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-[var(--color-electric-blue)] group-hover:text-black transition-colors shadow-[0_0_10px_transparent] group-hover:shadow-[0_0_15px_var(--color-electric-blue)]">
                      →
                    </div>
                  )}
                  {isLocked && (
                    <div className="w-10 h-10 rounded-full bg-gray-900/50 flex items-center justify-center text-gray-600">
                      🔒
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default TopicView;
