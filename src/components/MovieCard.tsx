import { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiConfig } from '../api/apiConfig';
import moment from 'moment';
import { addToWatchlist, removeFromWatchlist } from '../api/watchListSlice';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import WatchlistIcon from './WatchlistIcon';

const MovieCard = ({ data, index }: { data: any; index: number }) => {
    const dispatch= useDispatch()
    const [loaded, setLoaded] = useState(false);
  const imageURL = apiConfig?.originalImage(data?.poster_path);

  const watchlist = useSelector((state: any) => state.watchlist.items);
  const isSaved = watchlist.some((item: any ) => item.id === data.id);

  const handleToggleWatchlist = (e:any) => {
    e.preventDefault();
    if (isSaved) {
      dispatch(removeFromWatchlist(data.id));
      toast.success(`${data.title} has successfully  been removed from Watchlist`)
    } else {
      dispatch(addToWatchlist(data));
       toast.success(`${data.title} has successfully been added to Watchlist`)
    }
  };

  return (
    <div key={index} className="relative w-full shadow-lg shadow-black min-w-[230px] max-w-[430px] h-80 overflow-hidden rounded hover:scale-105 transition-all hover:border-x-2 border-amber-200">

      <Link to={`/view-details/${data.id}`}  className="block bgMorphismBlack h-full">
        {data?.poster_path ? (
            <>
                 {!loaded && (
        <div className="absolute inset-0 bg-neutral-700 animate-pulse" />
      )}

      <img
        src={imageURL ? imageURL : "https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png"}
        alt={data.title}
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
      />
            </>
        ) : (
            <img
            src={ "https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png"}
            alt={data.title}
            className={`h-full w-full object-cover `}
          />
        )}

        <div className="absolute bottom-0 h-16 backdrop-blur-3xl w-full bgMorphismBlack p-2">
          <h2 className="text-ellipsis text-lime-50 line-clamp-1 text-lg font-semibold">{data?.title || data?.name}</h2>
          <div className="text-sm text-neutral-400 flex justify-between items-center">
            <p className="text-lime-100">{moment(data.release_date).format('MMMM Do YYYY')}</p>
            <p className="bg-darkblue px-1 rounded-full text-xs text-white">
              Rating: <span className="font-extrabold text-amber-500">{data?.vote_average ? parseFloat(data?.vote_average).toFixed(1) : 'N/A'}</span>
            </p>
          </div>
        </div>
      </Link>

      <button
  onClick={handleToggleWatchlist}
  className="absolute outline-0 ring-0 top-2 right-2 z-10"
>
  <WatchlistIcon isSaved={isSaved} tooltipId={data.id + data.title} />
</button>
    </div>
  );
};

export default MovieCard;
