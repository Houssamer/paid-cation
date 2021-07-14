import React, { useEffect, useState } from 'react';
import './Header2.css';
import logo from '../../assets/Design/logo.png';
import profile from '../../assets/pictures/profile.png';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Logout, selectUser } from '../../features/userSlice';
import swal from "sweetalert";
import { removeReservations } from '../../features/reservationsSlice';

function Header2() {
    const history = useHistory();
    const [white, setWhite] = useState(false);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    function homeScreen() {
        history.push('/');
        dispatch(removeReservations());
    }

    function profileScreen() {
        history.push('/clientProfile')
    }

    function SignOut() {
        swal("Bien", "Vous êtes deconnecté", "success");
        dispatch(Logout());
        history.push('/');
        localStorage.removeItem('token');
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
        <div className={`header2 ${white && `header2__white`}`}>
            <img src={logo} alt="logo" className="header2__logo" onClick={homeScreen} />

            <img 
                src={user.image ? user.image : profile} 
                alt="profile" 
                className="header2__profile" 
                onClick={profileScreen} 
                onDoubleClick={SignOut}
                />
        </div>
    )
}

export default Header2
