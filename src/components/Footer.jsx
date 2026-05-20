const Footer = () => {
  return (
    <footer className="border-t border-gray-800/50 mt-20 glass-card rounded-none w-full">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <p className="text-gray-400 text-sm mb-2">
          &copy; {new Date().getFullYear()} TripleVerse. All rights reserved.
        </p>
        <p className="text-gray-500 text-xs text-center max-w-xl">
          Master Triple Integration Through Interactive 3D Learning. A futuristic mathematics platform.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
