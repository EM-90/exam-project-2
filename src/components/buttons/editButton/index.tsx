import React from "react";


interface EditButtonProps {

    text?: string;
    onClick: () => void;
    className: string;
    disabled: boolean;
    type?: "button" | "submit" | "reset";
    children?: React.ReactNode;  

}

const EditButton: React.FC<EditButtonProps> = ({
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
        className={`px-2.5 py-2.5 bg-skin-editBg text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
        {text && <span>{text}</span>}
      </button>
    )
}

export default EditButton;