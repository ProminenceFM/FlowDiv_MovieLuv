import { useParams } from "react-router-dom";
import { useGetMovieDetailsByIdQuery } from "../api/movieApiSlice";
import {
  BookmarkSimple,
  FilmSlate,
  SpinnerGap,
  Star,
  WarningCircle,
} from "@phosphor-icons/react";
import { apiConfig } from "../api/apiConfig";
import Empty from "../components/EmptyCard";
import BackButton from "../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist, removeFromWatchlist } from "../api/watchListSlice";
import { toast } from "react-toastify";

const ViewDetails = () => {
  const dispatch = useDispatch();
  const { id }: any = useParams();
  const { data: movie, isLoading, isError } = useGetMovieDetailsByIdQuery(id);

  const savedWatchList = useSelector((state: any) => state.watchlist.items);
  const isSaved = savedWatchList.some((item: any) => item?.id === movie?.id);

  const refreshPage = () => {
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="flex bg-darkblue items-center justify-center h-screen text-white">
        <SpinnerGap size={48} className="animate-spin" />
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="flex items-center bg-darkblue justify-center h-screen text-xl">
        <Empty
          Icon={WarningCircle}
          title="Something is wrong"
          handleButtonClick={refreshPage}
          buttonTitle=" Try Again"
          description={`We couldn’t load the movie description at the moment. Please check your internet connection or try again later.`}
        />
      </div>
    );
  }

  const {
    title,
    overview,
    genres,
    vote_average,
    release_date,
    runtime,
    poster_path,
    backdrop_path,
    credits,
  } = movie;

  const handleToggleWatchlist = (e: any) => {
    e.preventDefault();
    if (isSaved) {
      dispatch(removeFromWatchlist(movie?.id));
      toast.success(`${title} has successfully  been removed from Watchlist`)
    } else {
      dispatch(addToWatchlist(movie));
      toast.success(`${title} has successfully been added to Watchlist`)
    }
  };

  return (
    <div className="bg-darkblue text-lime-50 min-h-screen">
      <div className="relative h-[60dvh] min-h-[500px] md:h-[80dvh] w-full">
        <img
          src={
            backdrop_path
              ? apiConfig.originalImage(backdrop_path)
              : "https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png"
          }
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-darkblue via-darkblue/70 to-transparent  lg:p-20 md:p-16 sm:p-10 p-6 py-10 flex flex-col justify-end">
          <h1 className="text-4xl font-bold">{title}</h1>
          <div className="md:flex items-center gap-4 space-x-1.5 mt-2 text-sm text-white/80">
            <span>
              <FilmSlate className="inline-block mr-1" size={18} />{" "}
              {release_date}
            </span>
            <span>
              | {runtime >= 60 ? `${Math.floor(runtime / 60)}hr ` : ""}
              {runtime % 60}min
            </span>

            <span>| {genres.map((g: any) => g.name).join(", ")}</span>
            <span className="flex items-center gap-1 text-amber-500">
              <Star weight="fill" size={16} /> {vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="block md:flex  lg:px-20 md:px-16 sm:px-10 px-6 items-start space-x-8">
        <img
          src={
            poster_path
              ? apiConfig.w500Image(poster_path)
              : "https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png"
          }
          alt={title}
          className="w-full max-w-[500px] h-[225px] object-cover rounded-lg mb-2"
        />
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl text-lime-50 font-semibold mb-2">Overview</h2>
          <p className="text-white/80">{overview}</p>
          <div className="block md:flex items-center py-5 space-x-8 justify-end">
            <button
              onClick={handleToggleWatchlist}
              className="border flex px-3 py-2 items-center justify-center text-nowrap border-amber-300 text-amber-300 font-medium"
            >
              <BookmarkSimple
                size={24}
                weight={isSaved ? "fill" : "regular"}
                className="cursor-pointer text-amber-300"
              />
              ADD TO WATCHLIST
            </button>
            <BackButton />
          </div>
        </div>
      </div>

      {credits?.cast?.length > 0 && (
        <div className="max-w-6xl mx-auto lg:px-20 md:px-16 sm:px-10 px-6 py-18">
          <h2 className="text-2xl text-lime-50 font-semibold mb-4">Top Cast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
            {credits.cast.slice(0, 10).map((actor: any) => (
              <div key={actor.id} className="text-center">
                <img
                  src={
                    actor.profile_path
                      ? apiConfig.w500Image(actor.profile_path)
                      : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                  }
                  alt={actor.name}
                  className="w-full h-[200px] object-cover rounded-lg mb-2"
                />
                <p className="font-medium">{actor.name}</p>
                {actor.character && <p className="text-sm text-white/70">as {actor.character}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDetails;
