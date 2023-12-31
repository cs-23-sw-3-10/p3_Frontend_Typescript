import React, { useState } from "react";
import "./login.css";
import { useEditModeContext } from "../../EditModeContext";
type LoginProps = {
    setShowPasswordPrompt: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login = (props: LoginProps) => {
    //login page that takes in username and password and sends it to the backend
    //if the username and password is correct, then it will redirect to the home page
    //if the username and password is incorrect, then it will display an error message
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const useEditMode = useEditModeContext();

    function handleLogin(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();

        const body = {
            username: username,
            password: password,
        };

        // Send a POST request with the user input to the server and check if the user exists in the database
        fetch("http://localhost:8080/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((response) => {
                if (!response.ok) {
                    console.log("password is incorrect");
                    setMessage("Username or password is incorrect");

                    // Handle HTTP errors
                    setUsername("");
                    setPassword("");
                }
                if (response.ok) {
                    console.log("password is correct");
                    response.text().then((data) => {
                        localStorage.setItem("token", data);
                    });

                    setUsername("");
                    setPassword("");
                    useEditMode.setEditMode(true);
                    props.setShowPasswordPrompt(false);
                }
            })
            .catch((error) => {
                // Handle any errors
                console.error("There has been a problem with your fetch operation:", error);
                setUsername("");
                setPassword("");
            });
    }

    function handleLogout(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        localStorage.removeItem("token");
        setMessage("Logout successful");
        //Handle successful logout here (e.g., redirect to login)
    }

    return (
        <div className="loginContainer">
            <button className="close_button" onClick={() => props.setShowPasswordPrompt(false)}>
                {" "}
                x{" "}
            </button>
            <h1>Login</h1>
            <p>{message}</p>
            <form>
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="login_button" type="submit" onClick={(e) => handleLogin(e)}>
                    Login
                </button>
                {localStorage.getItem("auth_token") && <button onClick={(e) => handleLogout(e)}> Logout </button>}
            </form>
        </div>
    );
};

export default Login;
