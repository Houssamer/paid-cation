import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './ProfileReservation.css';
import Product from '../../../components/Product/Product';
import { setReservationDet } from '../../../features/pageSlice';
import { selectReservations } from '../../../features/reservationsSlice';
import empty from '../../../assets/Design/empty.png';

function ProfileReservation() {
    const dispatch = useDispatch();
    const reservations = useSelector(selectReservations);

    function handleDetail(id) {
        dispatch(setReservationDet(id));
    }

    return (
        <div className={`${reservations ? `reservation__client__container` : `reservation__client__empty__container`}`}>
            {
                reservations 
                ?
                    reservations.map(({id, title, image, lieu, features, price, type}) => (
                        <div className="reservation__client__produit" onClick={() => handleDetail(id)}>
                            <Product 
                                title={title} 
                                image={image} 
                                lieu={lieu} 
                                features={features} 
                                price={price} 
                                type={type}  
                            />
                        </div>
                    ))
                : (
                    <div className="reservation__client__empty">
                        <img src={empty} alt="empty" className="reservation__client__empty__img" />
                    </div>
                )
                
            }
        </div>
    )
}

export default ProfileReservation
