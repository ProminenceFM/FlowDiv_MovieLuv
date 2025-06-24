import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { List, X } from "@phosphor-icons/react"; // for menu toggle
import SearchBar from "./SearchBar";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <header className={`w-full drop-shadow-lg px-[clamp(1rem,5vw,4rem)] py-4 bg-darkblue text-white  p-4 transition-all duration-300 ${
        scrolled ?  'bg-darkblue/80 fixed top-0  z-50' : 'bg-darkblue' 
      }`}>
      <div className="flex items-center justify-between w-full">
        <Link to="/">
          <div className="flex items-baseline gap-2">
            <h1 className="font-extrabold hidden md:block bg-gradient-to-r from-lime-50 to-cyan-300 text-[clamp(1rem,4vw,1.75rem)] bg-clip-text text-transparent">
              FLOWDIV: ME
            </h1>
            <div className="w-[40px] h-[20px] rounded-2xl bg-gradient-to-r from-lime-50 to-cyan-300" />
          </div>
        </Link>

        <div className="block w-full max-w-sm mx-6">
          <SearchBar />
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
          {menuOpen ? <X size={24} /> : <List size={24} />}
        </button>

        <ul className="hidden lg:flex items-center space-x-6">
          {["popular", "upcoming", "watchlist"].map((type) => (
            <li key={type}>
              <NavLink
                to={`/${type}/view-more`}
                className={({ isActive }) =>
                  `${isActive
                    ? "text-amber-400 font-semibold underline"
                    : "hover:underline text-white"}`
                }
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {menuOpen && (
        <ul className="lg:hidden mt-4 space-y-2 px-4">
          {["popular", "upcoming", "watchlist"].map((type) => (
            <li key={type}>
              <NavLink
                to={`/${type}/view-more`}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `${isActive
                    ? "text-amber-400 font-semibold underline"
                    : "hover:underline text-white"} block py-2`
                }
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Header;
