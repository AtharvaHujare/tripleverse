import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { practiceTopics } from '../../data/practiceQuestions';
import TopicView from './TopicView';
import QuestionView from './QuestionView';
import { getAnalytics, getTopicProgress } from '../../services/db';

const Practice = () => {
  // Navigation State
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'topic', 'question'
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  
  // Real Data State
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    setAnalytics(getAnalytics());
  }, [currentView]); // Refresh when coming back to dashboard

  // Navigation Handlers
  const handleSelectTopic = (topicId) => {
    setSelectedTopicId(topicId);
    setCurrentView('topic');
  };

  const handleSelectQuestion = (questionId) => {
    setSelectedQuestionId(questionId);
    setCurrentView('question');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedTopicId(null);
    setSelectedQuestionId(null);
  };

  const handleBackToTopic = () => {
    setCurrentView('topic');
    setSelectedQuestionId(null);
  };

  const handleQuestionSolved = () => {
    // Analytics are updated automatically in db.js, we just trigger re-fetch when returning
  };

  // Dashboard View
  const renderDashboard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto"
    >
      {/* Stats Panel */}
      <div className="grid grid-cols-2 gap-4 mb-12">
        <div className="glass-card p-6 text-center border-t-4 border-[var(--color-neon-cyan)] shadow-[0_5px_20px_rgba(0,255,255,0.1)]">
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Total Solved</p>
          <p className="text-4xl font-bold text-[var(--color-neon-cyan)]">{analytics ? analytics.solvedCount : 0}</p>
        </div>
        <div className="glass-card p-6 text-center border-t-4 border-[var(--color-neon-green)] shadow-[0_5px_20px_rgba(74,222,128,0.1)]">
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Overall Accuracy</p>
          <p className="text-4xl font-bold text-[var(--color-neon-green)]">{analytics ? analytics.accuracy : 0}%</p>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-4">
        <span className="w-8 h-1 bg-[var(--color-electric-blue)]"></span>
        Select Problem Set
      </h2>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {practiceTopics.map((topic) => {
          const progress = getTopicProgress(topic.id);
          const completionRatio = progress.total > 0 ? (progress.solvedCount / progress.total) * 100 : 0;
          return (
            <motion.div
              key={topic.id}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectTopic(topic.id)}
              className="glass-card p-6 cursor-pointer relative overflow-hidden group border border-gray-800 hover:border-[var(--color-electric-blue)] transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(0,255,255,0.2)]"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-electric-blue)]/10 rounded-bl-full pointer-events-none group-hover:bg-[var(--color-electric-blue)]/20 transition-colors"></div>
              
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border 
                  ${topic.difficulty === 'Easy' ? 'border-green-500 text-green-400' : 
                    topic.difficulty === 'Medium' ? 'border-yellow-500 text-yellow-400' : 
                    topic.difficulty === 'Hard' ? 'border-red-500 text-red-400' : 
                    'border-purple-500 text-purple-400'}`}
                >
                  {topic.difficulty}
                </span>
                <span className="text-gray-400 text-sm font-mono">{progress.total > 0 ? `${progress.total} Qs` : 'Coming Soon'}</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-6 pr-4">{topic.title}</h3>
              
              <div className="w-full bg-gray-800 rounded-full h-1.5 mb-2">
                <div 
                  className="bg-gradient-to-r from-[var(--color-electric-blue)] to-[var(--color-neon-pink)] h-1.5 rounded-full transition-all duration-500" 
                  style={{ width: `${completionRatio}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 text-right">{progress.solvedCount}/{progress.total} Completed</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen px-4 py-8 relative">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-20 right-10 w-96 h-96 bg-[var(--color-neon-purple)]/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[var(--color-electric-blue)]/5 rounded-full blur-[80px]"></div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold neon-text-blue tracking-tight">Practice Zone</h1>
          <p className="text-gray-400 mt-2 text-sm uppercase tracking-widest">Premium Engineering Mathematics</p>
        </div>
        
        {currentView !== 'dashboard' && (
          <button 
            onClick={handleBackToDashboard}
            className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors border border-gray-600 text-sm font-bold flex items-center gap-2"
          >
            <span>🏠</span> Dashboard
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {currentView === 'dashboard' && <div key="dashboard">{renderDashboard()}</div>}
        {currentView === 'topic' && (
          <TopicView 
            key="topic" 
            topicId={selectedTopicId} 
            onSelectQuestion={handleSelectQuestion} 
          />
        )}
        {currentView === 'question' && (
          <QuestionView 
            key="question" 
            questionId={selectedQuestionId} 
            onBack={handleBackToTopic}
            onSolved={handleQuestionSolved}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Practice;
