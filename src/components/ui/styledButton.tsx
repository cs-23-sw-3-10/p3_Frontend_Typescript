import React, { ReactNode, ButtonHTMLAttributes } from "react";
import "./styledButton.css";

type StyledButtonProps = {
    children: ReactNode; // You can define what types of children the button can have
} & ButtonHTMLAttributes<HTMLButtonElement>; // This is a utility type for button props (e.g., onClick, disabled)

const StyledButton: React.FC<StyledButtonProps> = ({ children, ...props }) => {
    return (
        <button className="styledButton" {...props}>
            {children}
        </button>
    );
};

export default StyledButton;
