import React, { useEffect, useState } from 'react';
import './Header3.css';
import logo from '../../assets/Design/logo.png';
import profile from '../../assets/pictures/profile.png';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

function Header3() {
    const history = useHistory();
    const [white, setWhite] = useState(false);
    const user = useSelector(selectUser);

    function homeScreen() {
        history.push('/');
    }

    function profileScreen() {
        history.push('/espaceProfile')
    }

    useEffect(() => {
        window.addEventListener('scroll', ()=> {
            if (window.scrollY > 10) {
                setWhite(true);
            }
            else {
                setWhite(false);
            }
        });

        return () => {
            window.removeEventListener("scroll", window);
        }
    }, [])


    return (
        <div className={`header3 ${white && `header3__white`}`}>
            <img src={logo} alt="logo" className="header3__logo" onClick={homeScreen} />

            <img src={user.image ? user.image : profile} alt="profile" className="header3__profile" onClick={profileScreen} />
        </div>
    )
}

export default Header3;
