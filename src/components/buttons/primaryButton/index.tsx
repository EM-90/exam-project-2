import React from "react";

interface PrimaryButtonProps {
  text?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className: string;
  disabled: boolean;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  text,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`font-medium text-md leading-tight uppercase rounded-full focus:shadow-lg focus:ring-0 active:shadow-lg transition duration-150 ease-in-out ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {text && <span>{text}</span>}
    </button>
  );
};

export default PrimaryButton;
