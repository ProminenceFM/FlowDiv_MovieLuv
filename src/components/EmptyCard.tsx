import { IconProps } from "@phosphor-icons/react";
import { FC } from "react";

type EmptyProps = {
  Icon: FC<IconProps>;
  handleButtonClick: () => void;
  title: string;
  description: string;
  buttonTitle: string;
};

const EmptyCard: FC<EmptyProps> = ({
  Icon,
  handleButtonClick,
  title,
  description,
  buttonTitle,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-96 bg-darkblue/30 text-center text-lime-50 rounded-xl p-6">
      <Icon size={64} className="text-amber-200 mb-4" weight="duotone" />
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm max-w-[700] text-white/60 mt-2">{description}</p>

      <button
        onClick={handleButtonClick}
        className="mt-4 px-4 py-2 border-2 border-lime-50 text-lime-50 cursor-pointer hover:text-darkblue font-semibold hover:bg-cyan-50 shadow transition"
      >
        {buttonTitle}
      </button>
    </div>
  );
};

export default EmptyCard;