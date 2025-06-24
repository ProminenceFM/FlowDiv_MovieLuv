const HeroLoader = () => {
  return (
    <div className="w-screen h-[85dvh] min-h-[510px] relative rounded-br-[7rem] overflow-hidden bg-black text-white animate-pulse">
      <div className="absolute top-0 left-0 w-full h-full bg-neutral-800">
        <div className="absolute inset-0 w-full h-full transition-all duration-500">
          <div className="w-full h-full object-cover bg-neutral-700" />

          <div className="absolute top-[20%] left-1/2 pt-10 pl-10 transform bg-darkblue/60 rounded-tl-[5rem] -translate-x-1/2 w-[1140px] h-full max-w-[80%] pr-8 md:pr-[30%] text-white text-shadow">
            <div className="h-4 bg-neutral-600 rounded w-1/4 mb-4" />
            <div className="h-10 bg-neutral-600 rounded w-2/3 mb-3" />
            <div className="h-12 bg-neutral-600 rounded w-full mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-neutral-600 rounded w-full" />
              <div className="h-4 bg-neutral-600 rounded w-5/6" />
              <div className="h-4 bg-neutral-600 rounded w-3/4" />
            </div>

            <div className="grid grid-cols-2 gap-2 mt-5 w-[260px] h-[40px]">
              <div className="bg-neutral-700 rounded" />
              <div className="bg-neutral-700 border border-white rounded" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 flex gap-5">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="shadow-md w-[150px] h-[100px] md:h-[220px] bg-neutral-700 rounded-2xl relative overflow-hidden"
          >
            <div className="absolute bottom-[10px] left-[10px] right-[10px]">
              <div className="h-4 bg-neutral-600 mb-1 rounded w-3/4" />
              <div className="h-3 bg-neutral-500 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute top-[80%] right-[52%] flex gap-2 z-10">
        <div className="w-10 h-10 rounded-full bg-neutral-600" />
        <div className="w-10 h-10 rounded-full bg-neutral-600" />
      </div>
      <div
        className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-lime-50 to-cyan-300 animate-[runningTime_3s_linear_forwards]"
        style={{ width: "100%" }}
      ></div>
    </div>
  );
};

export default HeroLoader;
