import { useRef, useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

interface Props {
  data: any[];
  title: string;
  handleViewMore: any;
}

const HorizontalScroll = ({ data, title, handleViewMore }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const scrollAmount = 300;

  const handleScroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const newScrollLeft = direction === "right"
      ? container.scrollLeft + scrollAmount
      : container.scrollLeft - scrollAmount;

    container.scrollTo({ left: newScrollLeft, behavior: "smooth" });
  };

  const updateScrollState = () => {
    const container = containerRef.current;
  if (!container) return;

  const scrollLeft = container.scrollLeft;
  const scrollWidth = container.scrollWidth;
  const offsetWidth = container.offsetWidth;

  const isScrollable = scrollWidth > offsetWidth;

  setAtStart(!isScrollable || scrollLeft <= 0);
  setAtEnd(!isScrollable || scrollLeft + offsetWidth >= scrollWidth - 1);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    updateScrollState(); // Initialize state

    container.addEventListener("scroll", updateScrollState);
    return () => container.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <div className="container [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden mx-auto px-3 py-10">
      <div className="flex items-center justify-between">
        <p className="text-cyan-50 text-nowrap text-shadow font-semibold m-3 tracking-wide">{title}</p>
        {data.length > 0 && <p onClick={handleViewMore} className="text-cyan-100 text-shadow italic m-3 tracking-wide cursor-pointer hover:underline text-nowrap">View More</p>}
      </div>
      <div className="w-full h-[1.5px] bg-gradient-to-r from-lime-50 to-cyan-300 animate-[runningTime_3s_linear_forwards]"></div>

      {data.length > 0 && (
        <div className="relative mt-5">
          <div
            ref={containerRef}
            className="grid grid-cols-[repeat(auto-fit,230px)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden grid-flow-col gap-6 overflow-x-auto scroll-smooth scrollbar-hide relative z-10"
          >
            {data.map((item, index) => (
              <MovieCard key={index + item?.title} data={item} index={index + 1} />
            ))}
          </div>

          <div className="absolute top-0 hidden lg:flex justify-between w-full h-full items-center pointer-events-none">
            {!atStart && (
              <button
                onClick={() => handleScroll("left")}
                className="pointer-events-auto bg-cyan-50 text-darkblue p-2 rounded-full -ml-2 z-10"
              >
                <CaretLeft size={20} weight="bold" />
              </button>
            )}
            {!atEnd && (
              <button
                onClick={() => handleScroll("right")}
                className="pointer-events-auto bg-cyan-50 text-darkblue p-2 rounded-full -mr-2 z-10"
              >
                <CaretRight size={20} weight="bold" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HorizontalScroll;
