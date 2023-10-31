import React from 'react';
import './NavBar.css';

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
    );
}

export default NavBar;