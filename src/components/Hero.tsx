import { useEffect, useState } from "react";
import { apiConfig } from "../api/apiConfig";
import { BookmarkSimple, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist, removeFromWatchlist } from "../api/watchListSlice";
import { useNavigate } from "react-router";
import HeroLoader from "./Loader/HeroLoader";
import { toast } from "react-toastify";

const Hero = ({ movies }: { movies: any[] }) => {
  const [slideList, setSlideList] = useState(movies);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const dispatch= useDispatch()
  const navigate = useNavigate()
  const minSwipeDistance = 50;

const onTouchStart = (e: React.TouchEvent) => {
  setTouchEndX(null); // reset on new touch
  setTouchStartX(e.targetTouches[0].clientX);
};

const onTouchMove = (e: React.TouchEvent) => {
  setTouchEndX(e.targetTouches[0].clientX);
};

const onTouchEnd = () => {
  if (!touchStartX || !touchEndX) return;

  const distance = touchStartX - touchEndX;

  if (distance > minSwipeDistance) {
    handleNext();
  } else if (distance < -minSwipeDistance) {
    handlePrev(); 
  }
};

    const watchlist = useSelector((state: any) => state.watchlist.items);
    const isSaved = watchlist.some((item: any ) => item?.id === slideList[0]?.id);

    const handleToggleWatchlist = (e:any) => {
      e.preventDefault();
      if (isSaved) {
        dispatch(removeFromWatchlist(slideList[0].id));
        toast.success(`${slideList[0].title} has successfully  been removed from Watchlist`)
      } else {
        dispatch(addToWatchlist(slideList[0]));
        toast.success(`${slideList[0].title} has successfully been added to Watchlist`)
      }
    };

  const timeAutoNext = 7000;

  useEffect(() => {
    const interval = setInterval(() => handleNext(), timeAutoNext);
    return () => clearInterval(interval);
  }, [slideList]);

  const handleNext = () => {
    setSlideList((prev) => [...prev.slice(1), prev[0]]);
  };

  const handlePrev = () => {
    setSlideList((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
  };

  useEffect(()=>{setSlideList(movies)}, [movies])

  return (
    <>
    
      {movies.length > 0 ? (
        <div className="w-screen h-[60dvh] min-h-[510px] md:h-[70dvh] lg:h-[85dvh]  relative rounded-br-[7rem] overflow-hidden bg-black text-white">

          <div onTouchStart={onTouchStart}
  onTouchMove={onTouchMove}
  onTouchEnd={onTouchEnd} className="absolute top-0 left-0 w-full h-full">
            {slideList.length > 0 && (
              <div className="absolute inset-0 w-full h-full transition-all duration-500">
                <img
                  src={apiConfig?.originalImage(
                    slideList[0]?.backdrop_path || slideList[0]?.poster_path
                  )}
                  className="w-full h-full object-cover"
                  alt={slideList[0]?.title}
                />
                <div className="absolute top-[20%]  left-1/2 pt-10 pl-10 transform bg-darkblue/60 rounded-tl-[5rem] -translate-x-1/2 w-[1140px] h-full max-w-[80%] pr-8 md:pr-[30%] text-white text-shadow">
                  <div className="font-bold text-[clamp(0.7rem,2vw,1.35rem)] tracking-widest">
                    Rating:{" "}
                    <span className="font-extrabold text-amber-500">
                      {slideList[0]?.vote_average
                        ? parseFloat(slideList[0]?.vote_average).toFixed(1)
                        : "N/A"}
                    </span>
                  </div>
                  <div className="text-5xl  font-bold leading-tight"></div>
                  <div className=" text-[clamp(1rem,4vw,3.75rem)] line-clamp-1 sm:line-clamp-2 md:line-clamp-3 font-extrabold text-shadow leading-tight text-lime-50">
                    {slideList[0]?.title}
                  </div>
                  <div className="mt-4 text-sm line-clamp-3 sm:line-clamp-4 md:line-clamp-5 text-white/80">
                    {slideList[0]?.overview}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-5  max-w-[260px] h-[40px]">
                    <button onClick={()=> navigate(`/view-details/${slideList[0]?.id}`)} className="bg-white py-2 text-darkblue font-medium">
                      VIEW DETAILS
                    </button>
                    <button onClick={handleToggleWatchlist} className="border flex py-2 items-center justify-center h-[40px] text-nowrap border-amber-300 text-amber-300 font-medium">
                      <BookmarkSimple size={24} weight={isSaved ? "fill" : "regular"} className="cursor-pointer text-amber-300" /> WATCHLIST
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="absolute bottom-[30px] left-1/2  -translate-x-1 flex gap-5">
            {slideList.slice(0, 5).map((movie, index) => (
              <div
                key={index}
                className=" shadow-md w-[150px] h-[100px] md:h-[220px] relative"
              >
                <img
                  src={apiConfig?.w500Image(
                    movie?.backdrop_path || movie?.poster_path
                  )}
                  className="w-full h-full object-cover rounded-2xl"
                  alt="thumbnail"
                />
                <div className="absolute bg-darkblue/50 bottom-[10px] overflow-hidden left-[10px] right-[10px] text-white">
                  <div className="font-medium text-sm">{movie?.title}</div>
                  <div className="font-bold text-xs text-amber-500">
                    Rating: {" "}
                    {movie?.vote_average
                      ? parseFloat(movie?.vote_average).toFixed(1)
                      : ""}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute hidden md:flex top-[80%] right-[52%] gap-2 z-10">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full  flex justify-center items-center  bg-lime-50/30 text-white font-bold"
            >
              <CaretLeft />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 flex justify-center items-center rounded-full bg-lime-50/30 text-white font-bold"
            >
              <CaretRight />
            </button>
          </div>

          <div
            className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-lime-50 to-cyan-300  animate-[runningTime_3s_linear_forwards]"
            style={{ width: "100%" }}
          ></div>
        </div>
      ) : <HeroLoader/>}
    </>
  );
};

export default Hero;
