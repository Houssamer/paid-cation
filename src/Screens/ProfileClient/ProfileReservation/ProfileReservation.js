import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './ProfileReservation.css';
import Product from '../../../components/Product/Product';
import { setReservationDet } from '../../../features/pageSlice';
import { selectReservations } from '../../../features/reservationsSlice';
import empty from '../../../assets/Design/empty.png';
import { useSpring, animated } from 'react-spring';


function ProfileReservation() {
    const dispatch = useDispatch();
    const reservations = useSelector(selectReservations);
    const props = useSpring({
        from: {opacity: 0},
         to: {opacity: 1},
         config: {duration: 800},
    })

    function handleDetail(id) {
        dispatch(setReservationDet(id));
    }

    return (
        <animated.div style={props} className={`${reservations ? `reservation__client__container` : `reservation__client__empty__container`}`}>
            {
                reservations 
                ?
                    reservations.map(({_id, title, image, lieu, features, price, type}) => (
                        <div className="reservation__client__produit" onClick={() => handleDetail(_id)} key={_id}>
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
        </animated.div>
    )
}

export default ProfileReservation
