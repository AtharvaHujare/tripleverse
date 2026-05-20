import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/theory', label: 'Theory' },
    { path: '/practice', label: 'Practice Zone' },
    { path: '/analytics', label: 'AI Analytics' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-card rounded-none border-t-0 border-x-0 border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-3xl font-bold font-math text-white tracking-wider neon-text-blue">
                ∫∫∫ TripleVerse
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                    location.pathname === link.path
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-[var(--color-electric-blue)]/20 rounded-md -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {link.label}
                </Link>
              ))}
              <Link
                to="/login"
                className="ml-4 px-6 py-2 rounded-full font-bold text-black bg-[var(--color-neon-green)] hover:bg-white transition-all shadow-[0_0_15px_var(--color-neon-green)] hover:shadow-[0_0_25px_var(--color-neon-green)]"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
