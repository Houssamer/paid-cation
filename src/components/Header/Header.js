import React, { useEffect, useState } from 'react';
import './Header.css';
import logo from '../../assets/Design/logo.png';

function Header() {
    const [white, setWhite] = useState(false);
    const [yellow, setYellow] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', ()=> {
            if (window.scrollY > 100 && window.scrollY < 1500) {
                setWhite(true);
                setYellow(false)
            } else if (window.scrollY > 1500) {
                setYellow(true);
                setWhite(false);
            }
            else {
                setWhite(false);
                setYellow(false);
            }
        });

        return () => {
            window.removeEventListener("scroll", window);
        }
    }, [])

    return (
        <div className={`header ${white && `header__white`} ${yellow && `header__yellow`}`}>
            <img src={logo} alt="logo" className="header__img" />
            <button className={`header__button ${yellow && `header__button__yellow`}`}>Login</button>
        </div>
    )
}

export default Header
