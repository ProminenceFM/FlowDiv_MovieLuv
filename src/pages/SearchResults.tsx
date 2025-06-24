import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../api/movieApiSlice";
import { SpinnerGap, Empty } from "@phosphor-icons/react";
import MovieCard from "../components/MovieCard";
import BackButton from "../components/BackButton";

const SearchResults = () => {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState<any[]>([]);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    isFetching,
    isLoading,
    isError,
  } = useSearchMovieQuery({ searchParam: query, page });

  useEffect(() => {
    if (data?.results) {
      setAllMovies((prev) => [...prev, ...data.results]);
    }
  }, [data]);

  useEffect(() => {
    setAllMovies([]);
    setPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [query]);
  

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isFetching && data?.page < data?.total_pages) {
        setPage((prev) => prev + 1);
      }
    });

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [isFetching, data]);

  if (isLoading && page === 1) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <SpinnerGap size={32} className="animate-spin" />
      </div>
    );
  }

  if (isError || (!data?.results?.length && page === 1)) {
    return (
      <div className="flex bg-darkblue justify-center items-center h-screen text-lime-50 text-xl">
        <div className="w-fit">
          <Empty size={64} className="text-amber-200 mx-auto mb-4" weight="duotone" />
          No results found for <span className="ml-2 text-center text-amber-500">"{query}"</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-darkblue min-h-screen text-white lg:p-20 md:p-16 sm:p-10 p-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-6">
          Results for <span className="text-amber-500">"{query}"</span>
        </h1>
        <BackButton />
      </div>

      <div className="w-full left-0 h-[1.5px] mb-8 bg-gradient-to-r from-lime-50 to-cyan-300 animate-[runningTime_3s_linear_forwards]" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-4 md:gap-2 lg:gap-5 xl:gap-8 md:grid-cols-4">
        {allMovies.map((movie: any, index: number) => (
          <MovieCard key={movie.id + "-" + index} index={index} data={movie} />
        ))}
      </div>

      <div ref={loaderRef} className="h-16 flex justify-center items-center mt-10">
        {isFetching && <SpinnerGap size={24} className="animate-spin text-white" />}
      </div>
    </div>
  );
};

export default SearchResults;
