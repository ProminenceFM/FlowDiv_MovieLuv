import { Tooltip as ReactTooltip } from 'react-tooltip';
import { BookmarkSimple } from '@phosphor-icons/react';
import 'react-tooltip/dist/react-tooltip.css';

const WatchlistIcon = ({ isSaved, tooltipId }: { isSaved: boolean, tooltipId: string }) => (
  <div>
    <BookmarkSimple
      data-tooltip-id={tooltipId}
      data-tooltip-content={isSaved ? "Click to remove from watchlist" : "Click to add to watchlist"}
      size={24}
      weight={isSaved ? "fill" : "regular"}
      className="cursor-pointer text-amber-300 focus-visible:outline-none outline-0 ring-0 "
    />
    <ReactTooltip id={tooltipId} place="top" />
  </div>
);

export default WatchlistIcon;
