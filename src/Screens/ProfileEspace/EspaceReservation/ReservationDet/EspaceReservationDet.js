import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectReservationEdit, setReservation } from '../../../../features/espacePageSlice';
import { selectReservations } from '../../../../features/reservationsEspaceSlice';
import './EspaceReservationDet.css';
import arrow from '../../../../assets/Design/arrow.png';
import { useSpring, animated } from 'react-spring';

function EspaceReservationDet() {
    const dispatch = useDispatch();
    const reservations = useSelector(selectReservations);
    const id = useSelector(selectReservationEdit).id;
    const props = useSpring({
        from: {opacity: 0},
        to: {opacity: 1},
        config: {duration: 600},
    });

    const reservation = reservations.filter(reservation => reservation._id === id);

    function handleReturn() {
        dispatch(setReservation());
    }

    return (
        <animated.div style={props} className="reservationEdit__espace__container">
            <div className="reservationEdit__espace__content">
                <div className="reservation__espace__card">
                    <h2>{reservation[0].title}</h2>
                    <div className="reservation__espace__det">
                        <h4>Nom de client: <span>{reservation[0].lastName}</span></h4>
                        <h4>Prénom de client: <span>{reservation[0].firstName}</span></h4>
                        <h4>Numéro de tel: <span>{reservation[0].num}</span></h4>
                        <h4>Email: <span>{reservation[0].email}</span></h4>
                        <h4>Durée de réservation: <span>{reservation[0].duree}</span></h4>
                        <h4>prix: <span>{reservation[0].price}</span></h4>
                    </div>
                    <img src={arrow} alt="arrow" className="reservation__espace__arrow" onClick={handleReturn} />
                </div>
            </div>
        </animated.div>
    )
}

export default EspaceReservationDet;
