import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './ProfileClient.css';
import Header2 from '../../components/Header2/Header2';
import ProfileReservation from './ProfileReservation/ProfileReservation';
import ProfileReservationDet from './ProfileReservationDet/ProfileReservationDet';
import ProfileInformation from './ProfileInformation/ProfileInformation';
import ProfileInfoEdit from './ProfileInfoEdit/ProfileInfoEdit';
import { selectInfo, selectReservation, selectReservationEdit, setInformation, setReservation } from '../../features/pageSlice';
import axios from '../../axios/axios';
import { selectUser } from '../../features/userSlice';
import { removeReservations, setReservations } from '../../features/reservationsSlice';


function ProfileClient() {
    const dispatch = useDispatch()
    const user = useSelector(selectUser);
    const [reservationsP, setReservationsP] = useState(true);
    const [infos, setInfos] = useState(false);
    const profileReserva = useSelector(selectReservation);
    const profileInfo = useSelector(selectInfo);
    const reservationDet = useSelector(selectReservationEdit);
    const [ReservationsInfo, setReservationsInfo] = useState();

    useEffect(() => {
        const config = {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
            },
        };
        axios.get(`/api/reservations/user/${user.id}`, config)
             .then((res) => {
                setReservationsInfo(res.data)
             })
             .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        ReservationsInfo?.forEach((reservation) => {
            axios.get(`/api/products/${reservation.product_id}`)
            .then((res) => {
                       dispatch(setReservations(
                           {
                               ...reservation,
                               title: res.data.title,
                               lieu: res.data.lieu,
                               features: res.data.features,
                               type: res.data.type,
                           }
                       ))
                   
               })
               .catch((err) => console.log(err));
        })
    }, [ReservationsInfo])


    function handleReservations() {
        setInfos(false);
        setReservationsP(true);
        dispatch(setReservation())
    }

    function handleInformation() {
        setReservationsP(false);
        setInfos(true);
        dispatch(setInformation());
    }

    return (
        <div className="profile__container">
            <Header2 />
            <div className="profile__buttons">
                <button 
                    className={`profile__button ${reservationsP && `profile__button__active`}`}
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
