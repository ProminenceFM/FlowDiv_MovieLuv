import { useEffect, useRef, useState } from "react";
import { useGetMovieByTypeAndPageQuery } from "../api/movieApiSlice";
import {
  ArrowDown,
  BookmarkSimple,
  SpinnerGap,
  WarningCircle,
} from "@phosphor-icons/react";
import MovieCard from "../components/MovieCard";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import { bgStyle } from "../utils/style";
import EmptyCard from "../components/EmptyCard";

const More = () => {

  const { id }: any = useParams();
  const navigate = useNavigate();
  const [pageName, setPageName] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState<any[]>([]);
  const loaderRef = useRef(null);
  const shouldSkip = (id === "watchlist");
  const { data, isLoading, isFetching } = useGetMovieByTypeAndPageQuery({
    type: id,
    page,
  }, { skip: shouldSkip });

  useEffect(() => {
    const validTypes = ["popular", "upcoming", "watchlist"];

    if (!validTypes.includes(id)) {
      toast.error("Invalid URL or movie type!");
      navigate("/");
      return;
    }
    setPage(1);
    setAllMovies([]);

    if (id === "watchlist") {
      const saved = JSON.parse(localStorage.getItem("watchlist") || "[]");
      setPageName("My Watchlist");
      setAllMovies(saved);
    } else if (data?.results) {
      setPageName(id.charAt(0).toUpperCase() + id.slice(1) + " Movies");
    }
  }, [id]);

  useEffect(() => {
    if (data?.results && id !== "watchlist") {
      setPageName(id.charAt(0).toUpperCase() + id.slice(1) + " Movies");
      setAllMovies((prev) => [...prev, ...data.results]);
  
      if (page >= data.total_pages) {
        setHasMore(false); 
      }else {
        setHasMore(true)
      }
    }
  }, [data, id]);
  
  

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        !isFetching &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    });
  
    const currentLoader = loaderRef.current;
    if (currentLoader && id !== "watchlist") observer.observe(currentLoader);
  
    return () => {
      if (currentLoader && id !== "watchlist") observer.unobserve(currentLoader);
    };
  }, [isFetching, hasMore, id]);
  

  const refreshPage = () => {
    window.location.reload();
  };


  return (
    <div style={bgStyle} key={id}>
      <div className="min-h-screen bg-darkblue/45 bgMorphism lg:p-20 md:p-16 sm:p-10 p-6 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-[clamp(1rem,4vw,3.75rem)] font-bold text-shadow text-shadow-md text-lime-50 mb-6">
            {pageName}
          </h1>
          <BackButton />
        </div>

        <div className=" w-[100%] left-0 h-[1.5px] mb-8 bg-gradient-to-r from-lime-50 to-cyan-300  animate-[runningTime_3s_linear_forwards]"></div>

        {(id === "watchlist") && (allMovies.length === 0) && (
          <EmptyCard
            Icon={BookmarkSimple}
            title="Your Watchlist is Card"
            handleButtonClick={() => navigate("/popular/view-more")}
            buttonTitle="Browse Movies"
            description=" Start adding movies to track what you want to watch!"
          />
        )}

        {!isFetching && !isLoading && ["popular", "upcoming"].includes(id) && (allMovies.length === 0) && (
          <EmptyCard
            Icon={WarningCircle}
            title="Something Went Wrong"
            description={`We couldn’t load the ${id} movies at the moment. Please check your internet connection or try again later.`}
            buttonTitle="Refresh Page"
            handleButtonClick={refreshPage}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-4 md:gap-8 lg:gap-6 xl:gap-8 md:grid-cols-3 lg:grid-cols-4">
          {allMovies.map((movie, index) => (
            <MovieCard index={index} data={movie} />
          ))}
        </div>

        {id !== "watchlist" && (
          <div className="flex justify-center mt-10">
            {isFetching ? (
              <SpinnerGap size={32} className="animate-spin text-white" />
            ) : (
              allMovies.length > 0 && <ArrowDown size={32} className="text-white animate-bounce" />
            )}
          </div>
        )}

{hasMore && id !== "watchlist" && (
  <div ref={loaderRef} className="h-12" />
)}

      </div>
    </div>
  );
};

export default More;
