import React from "react";
import { ColorEnum } from "../../utils/Enums/ColouEnums";

// Define the props interface
interface ButtonProps {
  label: string; // The text to be displayed on the button
  onClick: () => void; // The function to call on button click
  type?: "button" | "submit" | "reset"; // Optional button type
  style?: string; // Optional additional classes
}

// Define the functional component using React.FC
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  style = "",
}) => {
  return (
    <button
      type={type}
      className={`${style} flex items-center justify-center px-6 py-2 text-gray-800 border border-black rounded-full transition duration-200 bg-[${ColorEnum.LIGHT_GRAY_BLUE}] hover:bg-black hover:text-white`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
