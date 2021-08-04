import React from 'react';
import './Header1.css';
import logo from '../../assets/Design/logo.png';
import { useHistory } from 'react-router-dom';

function Header1() {
    const history = useHistory();

    function handleRoute() {
        history.push('/');
    }
    return (
        <div className="header1">
            <img src={logo} alt="logo" className="header1__img" onClick={handleRoute} />
        </div>
    )
}

export default Header1
