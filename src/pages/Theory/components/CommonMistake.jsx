const CommonMistake = ({ children }) => {
  return (
    <div className="my-8 relative p-6 rounded-lg bg-[#251010] border border-red-500/50 shadow-[0_0_15px_rgba(255,0,0,0.1)] overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-red-500 shadow-[0_0_10px_red]"></div>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">⚠️</span>
        <h4 className="text-lg font-bold text-red-400 tracking-wide uppercase">Common Mistake</h4>
      </div>
      <div className="text-gray-300 leading-relaxed pl-9">
        {children}
      </div>
    </div>
  );
};

export default CommonMistake;
