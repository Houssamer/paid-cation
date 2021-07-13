import React from 'react';
import './ProfileReservationDet.css';
import arrow from '../../../assets/Design/arrow.png';
import { useDispatch, useSelector } from 'react-redux';
import { selectReservations } from '../../../features/reservationsSlice';
import { selectReservationEdit, setReservation } from '../../../features/pageSlice';

function ProfileReservationDet() {
    const dispatch = useDispatch();
    const reservations = useSelector(selectReservations);
    const id = useSelector(selectReservationEdit).id;


    const reservation = reservations.filter(reservation => reservation._id === id);

    

    function handleReturn() {
        dispatch(setReservation());
    }

    return (
        <div className="reservationEdit__client__container">
            <div className="reservationEdit__client__content">
                <div className="reservation__client__card">
                    <h2>{reservation[0].title}</h2>
                    <div className="reservation__client__det">
                        <h4>Numéro de tel: <span>{reservation[0].num}</span></h4>
                        <h4>Email: <span>{reservation[0].email}</span></h4>
                        <h4>Durée de réservation: <span>{reservation[0].duree}</span></h4>
                        <h4>prix: <span>{reservation[0].price}</span></h4>
                    </div>
                    <img src={arrow} alt="arrow" className="reservation__client__arrow" onClick={handleReturn} />
                </div>
            </div>
        </div>
    )
};

export default ProfileReservationDet;
