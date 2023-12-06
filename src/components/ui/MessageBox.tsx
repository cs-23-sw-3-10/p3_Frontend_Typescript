import React from "react";

interface MessageBoxProps {
    title: string;
    messages: string[];
    onClose: () => void;
}

const MessageBox: React.FC<MessageBoxProps> = ({
    title,
    messages,
    onClose,
}) => {
    console.log("Rendering MessageBox");
    return (
        <div
            style={{
                position: "fixed",
                top: "15%",
                left: "50%",
                transform: "translate(-50%)",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                height: "auto",
                width: "auto",
                zIndex: 100,
                maxHeight: "80%",
                overflowY: "auto"
            }}
        >
            <h1 style={{ marginBottom: "10px", fontWeight: "bold" }}>{title}</h1>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index} style={{ marginBottom: "10px" }}>
                        {msg}
                    </li>
                ))}
            </ul>

            <button
                onClick={onClose}
                style={{
                    display: "flex", // Enables flexbox
                    justifyContent: "center", // Centers horizontally
                    alignItems: "center", // Centers vertically
                    borderRadius: "5px",
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    height: "20px", // Ensure height is a string with unit
                    width: "20px", // Ensure width is a string with unit
                    backgroundColor: "red",
                    border: "none", // Optional: removes button border
                    color: "white", // Optional: changes text color
                    cursor: "pointer", // Optional: changes cursor on hover
                }}
            >
                x
            </button>
        </div>
    );
};

export default MessageBox;
