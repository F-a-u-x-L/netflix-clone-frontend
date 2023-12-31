import React, { useEffect, useState } from 'react'
import './Nav.css';

const Nav = () =>  {

    const [show, setShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100) {
                setShow(true);
            }
            else {
                setShow(false)
            }
        });

        return () => {
            window.removeEventListener("scroll", setShow(false))
        };
    }, []);

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img
                className='nav__logo'
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png" 
                alt='netflix Logo'
            />

            <img
                className='nav__avatar'
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" 
                alt='netflix Logo'
            />
        </div>
    )
}

export default Nav