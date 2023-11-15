import React, { ReactNode, ButtonHTMLAttributes } from "react";

type StyledButtonProps = {
    children: ReactNode; // You can define what types of children the button can have
} & ButtonHTMLAttributes<HTMLButtonElement>; // This is a utility type for button props (e.g., onClick, disabled)

const StyledButton: React.FC<StyledButtonProps> = ({ children, ...props }) => {
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded capitalize "
            {...props}
        >
            {children}
        </button>
    );
};

export default StyledButton;
