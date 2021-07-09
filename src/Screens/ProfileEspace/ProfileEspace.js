import React, { useState } from 'react';
import './ProfileEspace.css';
import Header3 from '../../components/Header3/Header3';
import { useDispatch, useSelector } from 'react-redux';
import { selectEspace, selectEspaceAdd, selectEspaceEdit, selectInfo, selectReservation, selectReservationEdit, setEspace, setInformation, setReservation } from '../../features/espacePageSlice';
import Espace from './Espaces/Espace';
import EspaceAdd from './Espaces/EspacesAdd/EspaceAdd';
import EspaceEdit from './Espaces/EspacesEdit/EspaceEdit';
import EspaceReservations from './EspaceReservation/Reservations/EspaceReservations';
import EspaceReservationDet from './EspaceReservation/ReservationDet/EspaceReservationDet';
import EspaceInfo from './EspaceInformation/EspaceInfo/EspaceInfo';
import EspaceInfoEdit from './EspaceInformation/EspaceInfoEdit/EspaceInfoEdit';


function ProfileEspace() {
  const dispatch = useDispatch();
  const [espacee, setEspacee] = useState(true);
  const [reservat, setReservat] = useState(false);
  const [info, setInfo] = useState(false);
  const reservations = useSelector(selectReservation);
  const reservationsDet = useSelector(selectReservationEdit)
  const espace = useSelector(selectEspace);
  const espaceAdd = useSelector(selectEspaceAdd);
  const espaceEdit = useSelector(selectEspaceEdit);
  const information = useSelector(selectInfo);


    function handleEspace() {
        setReservat(false);
        setInfo(false);
        setEspacee(true);
        dispatch(setEspace());
    }

    function handleReservation() {
        setInfo(false);
        setEspacee(false);
        setReservat(true);
        dispatch(setReservation());
    }

    function handleInformation() {
        setReservat(false);
        setEspacee(false);
        setInfo(true);
        dispatch(setInformation());
    }

    

  return (
    <div className="profile__espace__container">
      <Header3 />
      <div className="profile__espace__buttons">
        <button
          className={`${espacee && `profile__espace__button__active`}  profile__espace__button`}
          onClick={handleEspace}
        >
          Mes espaces
        </button>
        <button
          className={`${reservat && `profile__espace__button__active`}  profile__espace__button`}
          onClick={handleReservation}
        >
          Réservations
        </button>
        <button
          className={`${info && `profile__espace__button__active`}  profile__espace__button`}
          onClick={handleInformation}
        >
          Mes informations
        </button>
      </div>
      <div className="profile__espace__screens">
            {
                espace ? (<Espace />)
                : espaceAdd ? (<EspaceAdd />)
                : espaceEdit ? (<EspaceEdit />)
                : reservations ? (<EspaceReservations />)
                : reservationsDet ? (<EspaceReservationDet />)
                : information ? (<EspaceInfo />)
                : (<EspaceInfoEdit />)
            }
      </div>
    </div>
  );
}

export default ProfileEspace;
