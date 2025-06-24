import { MagnifyingGlass } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../utils/debounce";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const debouncedInput = useDebounce(input, 700);

  useEffect(() => {
    if (debouncedInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(debouncedInput.trim())}`);
    }
  }, [debouncedInput, navigate]);




  return (
    <form className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full">
      <MagnifyingGlass size={20} className="text-white" />
      <input
        type="text"
        placeholder="Search for movies..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="bg-transparent outline-none text-white w-full"
      />
    </form>
  );
};

export default SearchBar