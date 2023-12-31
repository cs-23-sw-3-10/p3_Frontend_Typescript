import React, { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useEditModeContext } from "../../EditModeContext";

//Items in the navigation bar. It is not used directly, anymore.
//const navBarItems = ["calendar_month", "data_table", "manufacturing"];

export const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const editMode = useEditModeContext();
    return (
        <nav className={`navBar ${isOpen ? "open" : ""}`}>
            <div className="navBarInner">
                <header className="navBarHeader">
                    <button type="button" className="navBarHeaderBurger" onClick={() => setIsOpen(!isOpen)}>
                        <span className="material-symbols-outlined"> {isOpen ? "close" : "menu"}</span>
                    </button>
                </header>
                <nav className="navBarMenuItems">
                    <span>
                        {isOpen ? (
                            <img src="https://cdn.kualo.com/website/icon_windfarm.png" alt="blaestLogo" className="navLogo" />
                        ) : (
                            <h2 className="text-2xl h-48 transform -rotate-90 text-center mr-5">BLAEST</h2>
                        )}
                    </span>
                    <Link to="/">
                        <button type="button" className="navBarButton">
                            <span className="material-symbols-outlined">calendar_month</span>
                            <p>Schedule</p>
                        </button>
                    </Link>

                    <Link to="/projects">
                        <button type="button" className="navBarButton">
                            <span className="material-symbols-outlined">folder_open</span>
                            <p>Blade Projects</p>
                        </button>
                    </Link>
                    <Link to="/bladetask">
                        <button type="button" className="navBarButton">
                            <span className="material-symbols-outlined">description</span>
                            <p>Blade Tasks</p>
                        </button>
                    </Link>
                    {editMode.isEditMode ? (
                        <Link to="/resources">
                            <button type="button" className="navBarButton">
                                <span className="material-symbols-outlined">manufacturing</span>
                                <p>Resources</p>
                            </button>
                        </Link>
                    ) : null}
                    <button
                        onClick={() => {
                            localStorage.clear();
                        }}
                    >
                        Clear auth
                    </button>
                </nav>
            </div>
        </nav>
    );
};

export default NavBar;

/*
export const NavBar = () => {
    return (
            <div className="navBox">
                <h1 className="title">Blaest</h1>
                <img src="https://cdn-icons-png.flaticon.com/512/286/286320.png" alt="blaestLogo" className="navLogo" />
                <nav className="navLinkBox">
                    <ul className="navLinks">
                        <li className="listing"><a href="/" className='link'>Schedule</a></li>
                        <li className="listing"><a href="/projects" className="link">Projects</a></li>
                        <li className="listing"><a href="/resources" className="link">Resources</a></li>
                    </ul>
                </nav>
            </div>

              {navBarItems.map((item) =>(
                        <button key={item} type="button" className="navBarButton">
                            <span className="material-symbols-outlined">{item}</span>
                            <p>{item}</p>
                        </button>
                    ))}
    );
}
*/
