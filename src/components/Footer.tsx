
import { Link } from "react-router";
import SearchBar from "./SearchBar";
import { bgStyle } from "../utils/style";

const Footer = () => {
  return (
    <footer style={bgStyle} className="bg-darkblue">
    <div className="w-full px-4 py-8 sm:px-6 md:px-10 bg-darkblue/70">
      <div className="rounded-lg shadow-md shadow-black/50 bg-darkblue">
        <div className="w-full max-w-screen-xl mx-auto px-8 py-6 md:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <ul className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-lime-50">
              <li>
                <Link to="/popular/view-more" className="hover:underline">
                  Popular
                </Link>
              </li>
              <li>
                <Link to="/upcoming/view-more" className="hover:underline">
                  Upcoming
                </Link>
              </li>
              <li>
                <Link to="/watchlist/view-more" className="hover:underline">
                  Watchlist
                </Link>
              </li>
              <li>
                <SearchBar />
              </li>
            </ul>
  
            {/* Logo */}
            <Link
              to="/"
              className="flex justify-center sm:justify-start items-center space-x-3"
            >
              <div className="flex items-baseline gap-2">
                <h1 className="font-extrabold hidden lg:block bg-gradient-to-r from-lime-50 to-cyan-300 text-xl sm:text-2xl bg-clip-text text-transparent">
                  FLOWDIV: ME
                </h1>
                <div className="w-[40px] sm:w-[50px] h-[10px] sm:h-[15px] rounded-2xl bg-gradient-to-r from-lime-50 to-cyan-300"></div>
              </div>
            </Link>
          </div>
  
          <hr className="my-6 border-gray-200 sm:mx-auto" />
  
          {/* Copyright */}
          <span className="block text-center text-sm text-cyan-700">
            © 2025{" "}
            <Link to="/" className="hover:underline">
              FolarinAluko™
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </div>
  </footer>
  
  );
};

export default Footer;
