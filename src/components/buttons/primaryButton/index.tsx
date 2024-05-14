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
        className={` text-skin-primary font-medium text-md leading-tight uppercase rounded-full shadow-sm  focus:shadow-lg focus:ring-0 active:shadow-lg transition duration-150 ease-in-out ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
        {text && <span>{text}</span>}
      </button>
    )
}

export default PrimaryButton;