const SummaryBox = ({ children }) => {
  return (
    <div className="my-10 p-8 rounded-xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-[var(--color-electric-blue)]/30 backdrop-blur-md relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-electric-blue)]/10 rounded-full blur-3xl"></div>
      <h3 className="text-2xl font-bold mb-6 text-[var(--color-electric-blue)] flex items-center gap-3">
        <span>📝</span> Summary & Key Takeaways
      </h3>
      <div className="space-y-4 text-gray-200">
        {children}
      </div>
    </div>
  );
};

export default SummaryBox;
