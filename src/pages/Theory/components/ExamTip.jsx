const ExamTip = ({ children }) => {
  return (
    <div className="my-8 relative p-6 rounded-lg bg-[#1a1025] border border-[var(--color-neon-purple)] shadow-[0_0_15px_rgba(138,43,226,0.15)] overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-neon-purple)] shadow-[0_0_10px_var(--color-neon-purple)]"></div>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">💡</span>
        <h4 className="text-lg font-bold text-[var(--color-neon-purple)] tracking-wide uppercase">Exam Tip</h4>
      </div>
      <div className="text-gray-200 leading-relaxed pl-9">
        {children}
      </div>
    </div>
  );
};

export default ExamTip;
