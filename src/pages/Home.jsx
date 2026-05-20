import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import logo from '../assets/logo.png';

const Home = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Particles Background */}
      {init && (
        <Particles
          id="tsparticles"
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            color: { value: ["#0ff", "#ff00ff", "#00ffff"] },
            links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.2, width: 1 },
            move: { enable: true, outModes: { default: "bounce" }, random: false, speed: 1, straight: false },
            number: { density: { enable: true, area: 800 }, value: 60 },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 -z-10"
      />
      )}

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10 flex flex-col items-center"
        >
          <img src={logo} alt="TripleVerse Logo" className="w-32 md:w-48 mb-8 drop-shadow-[0_0_15px_var(--color-neon-cyan)]" />
          <h1 className="text-5xl md:text-7xl font-bold font-math tracking-tight mb-6">
            <span className="text-white">Master </span>
            <span className="neon-text-blue">Triple Integration</span>
            <br />
            <span className="text-3xl md:text-5xl neon-text-pink">In 3D Style</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10">
            A futuristic mathematics gaming platform. Learn theory, solve problems, and compete on the global leaderboard.
          </p>
          <Link
            to="/theory"
            className="inline-block px-8 py-4 rounded-full font-bold text-lg text-black bg-[var(--color-neon-cyan)] hover:bg-white transition-all shadow-[0_0_20px_var(--color-neon-cyan)] hover:shadow-[0_0_40px_var(--color-neon-cyan)]"
          >
            Start Learning
          </Link>
        </motion.div>
        
        {/* Floating Math Symbols */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 text-6xl text-[var(--color-electric-blue)] opacity-50 font-math"
        >
          ∭
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 text-5xl text-[var(--color-neon-pink)] opacity-50 font-math"
        >
          dxdydz
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 neon-text-blue">Platform Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Learn Theory', desc: 'Interactive 3D visuals & step-by-step concepts.', icon: '📚', color: 'blue' },
            { title: 'Solve Problems', desc: 'Gamified practice zone with hints & solutions.', icon: '✍️', color: 'pink' },
            { title: 'Compete', desc: 'Climb the global leaderboard and earn XP.', icon: '🏆', color: 'green' }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="glass-card p-8 text-center flex flex-col items-center neon-border-glow"
            >
              <div className="text-6xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
