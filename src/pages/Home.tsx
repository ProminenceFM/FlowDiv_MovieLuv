import { lazy, Suspense, useEffect, useState } from "react";
import { useGetMoviesByTypeQuery } from "../api/movieApiSlice";
import { movieType } from "../utils/constants";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import HeroLoader from "../components/Loader/HeroLoader";
import HorizontalLoader from "../components/Loader/HorizontalLoader";
import { bgStyle } from "../utils/style";
import {
  BookmarkSimple,
  WarningCircle,
} from "@phosphor-icons/react";
import EmptyCard from "../components/EmptyCard";
const Hero = lazy(() => import("../components/Hero"));
const HorizontalScroll = lazy(() => import("../components/HorizontalScroll"));

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [moviesPopular, setMoviesPopular] = useState<any[]>([]);
  const [moviesUpcoming, setMoviesUpcoming] = useState<any[]>([]);
  const { data: popularMovies, isLoading: isPopularLoading, isFetching: popularIsFetching } =
    useGetMoviesByTypeQuery(movieType.popular);
  const { data: upcomingMovies,  isLoading: isUpcomingLoading, isFetching: upcomingIsFetching } =
    useGetMoviesByTypeQuery(movieType.upcoming);
  const savedWatchList = useSelector((state: any) => state.watchlist.items);

  useEffect(() => {
    if (popularMovies?.results) {
      setMoviesPopular(popularMovies.results);
    }
  }, [popularMovies]);

  useEffect(() => {
    if (upcomingMovies?.results) {
      setMoviesUpcoming(upcomingMovies.results);
    }
  }, [upcomingMovies]);

  const handleClickViewMore = (title: string) => {
    navigate(`/${title}/view-more`);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="bg-darkblue">
      <Suspense fallback={<HeroLoader />}>
        <Hero movies={moviesPopular} />
      </Suspense>
      <div className="w-[100%] bg-darkblue lg:p-20 md:p-16 sm:p-10 p-6">
        <Suspense fallback={<HorizontalLoader />}>
          {!popularIsFetching && !isPopularLoading && moviesPopular && moviesPopular.length > 0 ? (
            <HorizontalScroll
              data={moviesPopular}
              title={"Popular Movies"}
              handleViewMore={() => handleClickViewMore(movieType.popular)}
            />
          ) : (
            <EmptyCard
              Icon={WarningCircle}
              title="Something Went Wrong"
              description="We couldn’t load the popular movies at the moment. Please check your internet connection or try again later."
              buttonTitle="Refresh Page"
              handleButtonClick={refreshPage}
            />
          )}
        </Suspense>
      </div>
      <div
        style={bgStyle}
        className="w-[100%] mb-0 p-3 sm:p-5 md:p-8 lg:p-10 xl:p-12 rounded-tl-[7rem]"
      >
        <div className="bgMorphism w-[100%] p-3 sm:p-5 md:p-8 lg:p-10 xl:p-12 rounded-tl-[7rem] h-[100%]">
          <Suspense fallback={<HorizontalLoader />}>
            {!upcomingIsFetching && !isUpcomingLoading  && moviesUpcoming && moviesUpcoming.length > 0 ? (
              <HorizontalScroll
                data={moviesUpcoming}
                title="Upcoming Movies"
                handleViewMore={() => handleClickViewMore(movieType.upcoming)}
              />
            ) : (
              <EmptyCard
                Icon={WarningCircle}
                title="Something Went Wrong"
                description="We couldn’t load the upcoming movies at the moment. Please check your internet connection or try again later."
                buttonTitle="Refresh Page"
                handleButtonClick={refreshPage}
              />
            )}
          </Suspense>
        </div>
      </div>
      <div className="w-[100%] mt-0 bg-darkblue lg:p-20 md:p-16 sm:p-10 p-6">
        <Suspense fallback={<HorizontalLoader />}>
          <HorizontalScroll
            data={savedWatchList}
            title={"My WatchList"}
            handleViewMore={() => handleClickViewMore("watchlist")}
          />

          {savedWatchList.length === 0 && (
            <EmptyCard
              Icon={BookmarkSimple}
              title="Your Watchlist is Empty"
              handleButtonClick={() => navigate("/popular/view-more")}
              buttonTitle="Browse Movies"
              description=" Start adding movies to track what you want to watch!"
            />
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
