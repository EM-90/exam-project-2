import React from "react";


interface PrimaryButtonProps {

    text?: string;
    onClick?: () => void;
    className: string;
    disabled: boolean;
    type?: "button" | "submit" | "reset";
    children?: React.ReactNode;  

}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    children,
    text,
    onClick,
    className = '',
    disabled = false,
    type = 'button'

}) => {
    return(
        <button
        type={type}
        className={` text-skin-primary font-medium text-md leading-tight uppercase rounded-full shadow-md hover:bg-skin-primary hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
        {text && <span>{text}</span>}
      </button>
    )
}

export default PrimaryButton;