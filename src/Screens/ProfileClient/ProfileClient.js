import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './ProfileClient.css';
import Header2 from '../../components/Header2/Header2';
import ProfileReservation from './ProfileReservation/ProfileReservation';
import ProfileReservationDet from './ProfileReservationDet/ProfileReservationDet';
import ProfileInformation from './ProfileInformation/ProfileInformation';
import ProfileInfoEdit from './ProfileInfoEdit/ProfileInfoEdit';
import { selectInfo, selectReservation, selectReservationEdit, setInformation, setReservation } from '../../features/pageSlice';

function ProfileClient() {
    const dispatch = useDispatch()
    const [reservations, setReservations] = useState(true);
    const [infos, setInfos] = useState(false);
    const profileReserva = useSelector(selectReservation);
    const profileInfo = useSelector(selectInfo);
    const reservationDet = useSelector(selectReservationEdit);



    function handleReservations() {
        setInfos(false);
        setReservations(true);
        dispatch(setReservation())
    }

    function handleInformation() {
        setReservations(false);
        setInfos(true);
        dispatch(setInformation());
    }

    return (
        <div className="profile__container">
            <Header2 />
            <div className="profile__buttons">
                <button 
                    className={`profile__button ${reservations && `profile__button__active`}`}
                    onClick={handleReservations}
                >
                    Réservations
                </button>
                <button 
                    className={`profile__button ${infos && `profile__button__active`}`}
                    onClick={handleInformation}
                    >
                    Mes informations
                </button>
            </div>
            <div className="profile__screens">
                {
                    profileReserva ? (<ProfileReservation />)
                    : reservationDet ? (<ProfileReservationDet />)
                    : profileInfo ? (<ProfileInformation />)
                    : <ProfileInfoEdit />
                }
            </div>
        </div>
    )
}

export default ProfileClient;
