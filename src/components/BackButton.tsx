import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 cursor-pointer text-white  px-3 py-2 hover:text-amber-300 transition"
    >
      <ArrowLeft  size={20} className="text-amber-50 hover:text-amber-300"/>
      <span>Back</span>
    </button>
  );
};

export default BackButton;
