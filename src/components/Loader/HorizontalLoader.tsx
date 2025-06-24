
const HorizontalLoader = () => {
  return (
    <div className="container mx-auto px-3 py-10">
      <div className="flex items-center justify-between mb-3">
        <div className="bg-cyan-900/40 h-6 w-32 rounded animate-pulse" />
        <div className="bg-cyan-900/40 h-5 w-20 rounded animate-pulse" />
      </div>

      <div className="w-full h-[1.5px] bg-gradient-to-r from-lime-50 to-cyan-300 mb-5" />

      <div className="relative mt-5">
        <div className="grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-x-auto scroll-smooth scrollbar-hide">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-[230px] h-[345px] bg-cyan-950/30 rounded-2xl animate-pulse"
            >
              <div className="w-full h-full rounded-2xl bg-cyan-800/30" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalLoader;
