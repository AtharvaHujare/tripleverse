import { motion } from 'framer-motion';
import { useState } from 'react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="glass-card p-10 w-full max-w-md relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-electric-blue)] via-[var(--color-neon-pink)] to-[var(--color-neon-cyan)]"></div>
        
        <h2 className="text-3xl font-bold text-center mb-8 text-white font-math tracking-widest">
          {isLogin ? 'Welcome Back' : 'Join TripleVerse'}
        </h2>

        <form className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
              <input 
                type="text" 
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-pink)] transition-colors"
                placeholder="MathGenius99"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-pink)] transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-pink)] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r from-[var(--color-electric-blue)] to-[var(--color-neon-pink)] hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(255,0,255,0.5)]"
          >
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="ml-2 text-[var(--color-neon-cyan)] hover:underline focus:outline-none"
            >
              {isLogin ? 'Create one' : 'Log in'}
            </button>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800">
          <button className="w-full py-3 rounded-lg font-bold text-black bg-white hover:bg-gray-200 transition-colors flex justify-center items-center gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
