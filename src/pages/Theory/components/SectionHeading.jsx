import { motion } from 'framer-motion';

const SectionHeading = ({ children }) => {
  return (
    <motion.h2 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="text-3xl font-bold mb-8 text-white flex items-center gap-3 border-b border-[var(--color-electric-blue)]/30 pb-4"
    >
      <span className="w-2 h-8 bg-[var(--color-electric-blue)] rounded-full shadow-[0_0_10px_var(--color-electric-blue)]"></span>
      {children}
    </motion.h2>
  );
};

export default SectionHeading;
