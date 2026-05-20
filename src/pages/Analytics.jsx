import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Pie, Bar, Doughnut } from 'react-chartjs-2';
import { practiceTopics, questions } from '../data/practiceQuestions';
import { FaFire, FaTrophy, FaBrain, FaChartLine, FaExclamationTriangle, FaCheckCircle, FaRobot, FaLock, FaBullseye, FaBolt, FaHistory } from 'react-icons/fa';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Helper for typewriter effect
const TypewriterText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    let i = 0;
    setDisplayText('');
    const interval = setInterval(() => {
      setDisplayText((prev) => prev + text.charAt(i));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [text]);
  return <span>{displayText}</span>;
};

const Analytics = () => {
  const [init, setInit] = useState(false);
  const [db, setDb] = useState(null);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));

    const rawData = localStorage.getItem('tripleverse_progress');
    if (rawData) {
      try {
        setDb(JSON.parse(rawData));
      } catch (e) {
        setDb({ attempts: [], unlocked: [] });
      }
    } else {
      setDb({ attempts: [], unlocked: [] });
    }
  }, []);

  const stats = useMemo(() => {
    if (!db) return null;

    const attempts = db.attempts || [];
    const totalAttempts = attempts.length;
    
    if (totalAttempts === 0) {
      return {
        totalAttempts: 0, correctAttempts: 0, wrongAttempts: 0, solvedQuestions: 0, accuracy: 0, skipped: questions.length, totalTime: 0,
        topicArray: [], strongTopics: [], weakTopics: [], xp: 0, level: 0, streak: 0, recentHistory: [], trendData: [0], isEmpty: true
      };
    }

    const isCorrectAttempt = (a) => a.isCorrect === true || a.isCorrect === 'true';
    const correctAttempts = attempts.filter(isCorrectAttempt).length;
    const wrongAttempts = attempts.filter(a => !isCorrectAttempt(a)).length;

    // UNIQUE solved questions — each question counted only once
    const solvedQuestionIds = new Set(
      attempts.filter(isCorrectAttempt).map(a => a.questionId)
    );
    const solvedQuestions = solvedQuestionIds.size;

    const accuracy = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;
    const totalQuestions = questions.length;
    const skipped = totalQuestions - new Set(attempts.map(a => a.questionId)).size;
    
    let totalTime = 0;
    const topicData = {};
    practiceTopics.forEach(t => {
      topicData[t.id] = { id: t.id, title: t.title, correct: 0, wrong: 0, total: 0, time: 0 };
    });

    attempts.forEach(a => {
      totalTime += (a.timeTaken || 0);
      if (topicData[a.topicId]) {
        topicData[a.topicId].total++;
        topicData[a.topicId].time += (a.timeTaken || 0);
        if (isCorrectAttempt(a)) topicData[a.topicId].correct++;
        else topicData[a.topicId].wrong++;
      }
    });

    const topicArray = Object.values(topicData).filter(t => t.total > 0).map(t => ({
      ...t,
      accuracy: Math.round((t.correct / t.total) * 100),
      avgTime: t.total > 0 ? Math.round(t.time / t.total) : 0
    })).sort((a, b) => b.accuracy - a.accuracy);

    const strongTopics = topicArray.filter(t => t.accuracy >= 70);
    const weakTopics = topicArray.filter(t => t.accuracy < 50);

    // XP & Streak calculation — based on unique solved questions only
    const xp = solvedQuestions;
    const level = Math.floor(xp / 5);
    
    // Naive streak based on unique days of timestamps
    const days = new Set(attempts.map(a => new Date(a.timestamp).toDateString()));
    const streak = days.size;

    // Recent History (last 5)
    const recentHistory = [...attempts].sort((a, b) => b.timestamp - a.timestamp).slice(0, 5).map(a => {
      const q = questions.find(x => x.id === a.questionId);
      const t = practiceTopics.find(x => x.id === a.topicId);
      return { ...a, questionName: q ? `Q: ${q.id}` : 'Unknown', topicName: t ? t.title : 'Unknown' };
    });

    // Trend data
    const trendData = [];
    let rollingCorrect = 0;
    attempts.forEach((a, i) => {
      if (isCorrectAttempt(a)) rollingCorrect++;
      if ((i + 1) % Math.ceil(totalAttempts / 10) === 0 || i === totalAttempts - 1) {
        trendData.push(Math.round((rollingCorrect / (i + 1)) * 100));
      }
    });

    return {
      totalAttempts, correctAttempts, wrongAttempts, solvedQuestions, accuracy, skipped, totalTime,
      topicArray, strongTopics, weakTopics, xp, level, streak, recentHistory, trendData, isEmpty: false
    };
  }, [db]);

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

  // Background Particles
  const particlesOptions = {
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    particles: {
      color: { value: "#00f3ff" },
      links: { color: "#00f3ff", distance: 150, enable: true, opacity: 0.2, width: 1 },
      move: { enable: true, speed: 1, direction: "none", random: false, straight: false, outModes: { default: "bounce" } },
      number: { density: { enable: true, area: 800 }, value: 40 },
      opacity: { value: 0.3 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  if (!db) return <div className="min-h-screen bg-[#050505] flex items-center justify-center"><div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div></div>;



  // Charts Config
  const doughnutData = {
    labels: ['Accuracy', 'Inaccuracy'],
    datasets: [{
      data: [stats.accuracy, 100 - stats.accuracy],
      backgroundColor: ['#00f3ff', '#1f2937'],
      borderColor: ['#00f3ff', '#111827'],
      borderWidth: 2,
    }],
  };

  const lineData = {
    labels: stats.trendData.map((_, i) => `T-${stats.trendData.length - i}`),
    datasets: [{
      label: 'Accuracy Trend %',
      data: stats.trendData,
      borderColor: '#00f3ff',
      backgroundColor: 'rgba(0, 243, 255, 0.1)',
      tension: 0.4, fill: true, pointBackgroundColor: '#00f3ff',
    }],
  };

  const barData = {
    labels: stats.topicArray.map(t => t.title.substring(0, 15) + '...'),
    datasets: [{
      label: 'Topic Accuracy %',
      data: stats.topicArray.map(t => t.accuracy),
      backgroundColor: stats.topicArray.map(t => t.accuracy >= 70 ? '#4ade80' : t.accuracy >= 50 ? '#facc15' : '#f87171'),
      borderRadius: 4,
    }],
  };

  const pieData = {
    labels: ['Correct', 'Wrong', 'Skipped'],
    datasets: [{
      data: [stats.correctAttempts, stats.wrongAttempts, stats.skipped],
      backgroundColor: ['rgba(74, 222, 128, 0.8)', 'rgba(248, 113, 113, 0.8)', 'rgba(156, 163, 175, 0.8)'],
      borderColor: '#111827', borderWidth: 2,
    }],
  };

  const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#e5e7eb' } } }, scales: { y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' } }, x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' } } } };

  return (
    <div className="min-h-screen bg-[#050505] text-white relative px-4 py-12 overflow-x-hidden font-sans selection:bg-cyan-500/30">
      {init && <Particles id="tsparticles" options={particlesOptions} className="absolute inset-0 z-0 pointer-events-none" />}
      
      {/* Dynamic ambient glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-green-600/10 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen"></div>

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="relative z-10 max-w-7xl mx-auto space-y-12">
        
        {/* HERO ANALYTICS HEADER */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 mb-6 font-mono text-sm tracking-widest backdrop-blur-md">
            <FaRobot className="animate-pulse" /> SYSTEM ACTIVE // NEURAL LINK ESTABLISHED
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase">
            AI Performance <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 drop-shadow-[0_0_20px_rgba(0,255,255,0.4)]">Analytics</span>
          </h1>
          <p className="text-xl text-cyan-100/60 max-w-2xl mx-auto font-light">
            Real-time telemetry and predictive insights based on your cognitive mathematical patterns.
          </p>
        </motion.div>

        {stats.isEmpty && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center p-6 rounded-2xl bg-cyan-900/20 border border-cyan-500/50 shadow-[0_0_30px_rgba(0,255,255,0.2)]">
            <h2 className="text-2xl font-bold text-cyan-300 uppercase tracking-widest animate-pulse flex items-center justify-center gap-3">
              <FaRobot /> Start solving questions to unlock AI analytics.
            </h2>
          </motion.div>
        )}

        {/* STATS ROW */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'Accuracy %', val: `${stats.accuracy}%`, icon: <FaBullseye />, color: 'cyan' },
            { label: 'Total XP', val: stats.xp.toLocaleString(), icon: <FaBolt />, color: 'yellow' },
            { label: 'Solved', val: stats.solvedQuestions, icon: <FaCheckCircle />, color: 'green' },
            { label: 'Level', val: stats.level, icon: <FaTrophy />, color: 'purple' },
            { label: 'Study Streak', val: `${stats.streak} Days`, icon: <FaFire />, color: 'orange' },
            { label: 'Weak Topics', val: stats.weakTopics.length, icon: <FaExclamationTriangle />, color: 'red' },
          ].map((stat, i) => (
            <motion.div whileHover={{ y: -5, scale: 1.02 }} key={i} className={`p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group border-b-4 border-b-${stat.color}-500 shadow-[0_8px_32px_rgba(0,0,0,0.3)]`}>
              <div className={`absolute top-0 right-0 -mr-4 -mt-4 text-[80px] opacity-10 text-${stat.color}-500 group-hover:scale-110 transition-transform duration-500`}>{stat.icon}</div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">{stat.icon} {stat.label}</p>
              <p className="text-3xl font-black text-white">{stat.val}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* MAIN CHARTS SECTION */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><FaChartLine className="text-cyan-400" /> Accuracy Trajectory</h3>
            <div className="h-[300px]">
              <Line data={lineData} options={chartOptions} />
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl flex flex-col justify-center items-center">
             <h3 className="text-xl font-bold text-white mb-6 w-full text-left">Cognitive Precision</h3>
             <div className="w-48 h-48 relative">
               <Doughnut data={doughnutData} options={{ cutout: '80%', plugins: { legend: { display: false } } }} />
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-4xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">{stats.accuracy}%</span>
               </div>
             </div>
          </div>
        </motion.div>

        {/* AI WEAKNESS & STRENGTH DETECTOR */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div whileHover={{ scale: 1.01 }} className="p-8 rounded-3xl bg-red-950/20 border border-red-500/30 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[80px] -mr-10 -mt-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50"></div>
            <h3 className="text-2xl font-black text-red-400 mb-6 flex items-center gap-3">
              <div className="p-2 bg-red-500/20 rounded-lg"><FaExclamationTriangle /></div> AI Weakness Detected
            </h3>
            
            {stats.weakTopics.length > 0 ? (
              <div className="space-y-6 relative z-10">
                <div>
                  <p className="text-sm text-red-300/70 uppercase tracking-widest font-bold mb-2">Critical Topics</p>
                  <div className="flex flex-wrap gap-2">
                    {stats.weakTopics.slice(0, 3).map((t, i) => (
                      <span key={i} className="px-3 py-1 bg-red-500/20 text-red-300 border border-red-500/30 rounded-md text-sm">{t.title}</span>
                    ))}
                  </div>
                </div>
                
                <div className="p-5 bg-black/40 border border-red-500/20 rounded-xl">
                  <p className="text-sm text-red-300/70 uppercase tracking-widest font-bold mb-3">Improvement Plan</p>
                  <ol className="list-decimal pl-5 text-gray-300 space-y-2 text-sm">
                    <li>Review core theoretical formulas for <span className="text-white font-bold">{stats.weakTopics[0]?.title}</span>.</li>
                    <li>Solve 10 easy-tier questions to rebuild foundation.</li>
                    <li>Re-attempt the {stats.weakTopics[0]?.wrong} previously failed questions.</li>
                  </ol>
                </div>
                <div className="flex justify-between items-center border-t border-red-500/20 pt-4">
                  <span className="text-gray-400 text-sm">Estimated Recovery Time:</span>
                  <span className="text-red-400 font-black animate-pulse">3 Days</span>
                </div>
              </div>
            ) : (
              <div className="h-48 flex flex-col items-center justify-center text-center relative z-10">
                <FaCheckCircle className="text-4xl text-green-500/50 mb-3" />
                <p className="text-gray-400">No critical weaknesses detected in current telemetry.</p>
              </div>
            )}
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} className="p-8 rounded-3xl bg-green-950/20 border border-green-500/30 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/10 rounded-full blur-[80px] -mr-10 -mt-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50"></div>
            <h3 className="text-2xl font-black text-green-400 mb-6 flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg"><FaBrain /></div> Neural Strengths
            </h3>
            
            {stats.strongTopics.length > 0 ? (
              <div className="space-y-6 relative z-10">
                <div>
                  <p className="text-sm text-green-300/70 uppercase tracking-widest font-bold mb-2">Mastered Areas</p>
                  <div className="space-y-3">
                    {stats.strongTopics.slice(0, 3).map((t, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-black/40 border border-green-500/20 rounded-xl">
                        <span className="text-gray-200 font-medium text-sm flex items-center gap-2"><FaCheckCircle className="text-green-500"/> {t.title}</span>
                        <span className="text-green-400 font-bold">{t.accuracy}% Acc</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                  <p className="text-green-300 text-sm"><span className="font-bold text-green-400">Analysis:</span> Consistently high accuracy and optimal problem-solving velocity observed. Maintain current trajectory.</p>
                </div>
              </div>
            ) : (
              <div className="h-48 flex flex-col items-center justify-center text-center relative z-10">
                <FaChartLine className="text-4xl text-gray-500/50 mb-3" />
                <p className="text-gray-400">Solve more questions to map your neural strengths.</p>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* SMART ROADMAP & PREDICTIONS */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden">
            <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
              <FaRobot className="text-cyan-400" /> Dynamic AI Roadmap
            </h3>
            <div className="relative border-l-2 border-cyan-500/30 ml-4 space-y-8">
              <div className="relative pl-8">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.8)] border-4 border-black"></div>
                <h4 className="text-cyan-400 font-black uppercase tracking-wider text-sm mb-1">Phase 1: Immediate Action</h4>
                <p className="text-gray-300 text-sm">Target {stats.weakTopics[0]?.title || 'core fundamentals'} and complete 5 precision exercises.</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-white/20 border-4 border-black"></div>
                <h4 className="text-white/60 font-black uppercase tracking-wider text-sm mb-1">Phase 2: Tactical Expansion</h4>
                <p className="text-gray-400 text-sm">Attempt mixed-difficulty quiz focusing on integration boundary conditions.</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-white/20 border-4 border-black"></div>
                <h4 className="text-white/60 font-black uppercase tracking-wider text-sm mb-1">Phase 3: Deep Mastery</h4>
                <p className="text-gray-400 text-sm">Achieve Level {stats.level + 1} and elevate overall accuracy to {Math.min(100, stats.accuracy + 5)}%.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 p-8 rounded-3xl bg-gradient-to-br from-cyan-900/30 to-purple-900/30 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_40px_rgba(0,255,255,0.1)] relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/20 blur-[60px]"></div>
            <h3 className="text-lg font-bold text-cyan-300 mb-6 uppercase tracking-widest text-center">Prediction Matrix</h3>
            
            <div className="text-center mb-8">
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-500 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                {Math.min(99, Math.round(stats.accuracy * 0.8 + stats.level * 2))}%
              </div>
              <p className="text-cyan-100/60 text-sm uppercase tracking-widest mt-2">Exam Readiness Score</p>
            </div>

            <div className="space-y-4">
              <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(100, stats.accuracy + 10)}%` }} transition={{ duration: 1.5, delay: 0.5 }} className="h-full bg-gradient-to-r from-cyan-500 to-green-400"></motion.div>
              </div>
              <p className="text-xs text-gray-400 text-center leading-relaxed">
                If current momentum is maintained, 100% mastery of Level {stats.level} modules will be achieved in <span className="text-white font-bold">14 Days</span>.
              </p>
            </div>
          </div>
        </motion.div>


        {/* AI INSIGHTS & MOTIVATION PANEL */}
        <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/40 backdrop-blur-md shadow-[0_0_50px_rgba(0,255,255,0.15)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 flex-1">
            <p className="text-cyan-300 font-mono text-sm tracking-widest mb-2 uppercase flex items-center gap-2"><FaBrain /> Neural Insights Generation</p>
            <p className="text-2xl md:text-3xl font-light text-white leading-relaxed">
              "<TypewriterText text={
                stats.accuracy > 70 
                  ? "Outstanding cognitive execution. Your pattern recognition is operating at peak efficiency. Maintain focus on advanced problem sets."
                  : stats.accuracy > 40
                  ? "Steady progress detected. You are adapting to the algorithms. Prioritize identifying your recurring structural errors."
                  : "Critical calibration needed. Reroute efforts to foundational concepts before attempting complex variable transformations."
              } />"
            </p>
          </div>
          <div className="relative z-10 flex-shrink-0 text-center md:text-right">
             <div className="text-sm text-cyan-200/50 uppercase tracking-widest mb-1">Session Integrity</div>
             <div className="text-4xl font-black text-white">{stats.streak > 0 ? 'STABLE' : 'DORMANT'}</div>
          </div>
        </motion.div>

      </motion.div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 243, 255, 0.3); border-radius: 4px; }
      `}} />
    </div>
  );
};

export default Analytics;

