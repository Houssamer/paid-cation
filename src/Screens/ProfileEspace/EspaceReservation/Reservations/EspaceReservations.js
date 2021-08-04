import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setReservationDet } from '../../../../features/espacePageSlice';
import empty from '../../../../assets/Design/empty.png'
import './EspaceReservations.css';
import { selectReservations } from '../../../../features/reservationsEspaceSlice';
import Product from '../../../../components/Product/Product';
import { useSpring, animated } from 'react-spring';

function EspaceReservations() {
    const dispatch = useDispatch();
    const reservations = useSelector(selectReservations);
    const props = useSpring({
        from: {opacity: 0},
        to: {opacity: 1},
        config: {duration: 600},
    });

    function handleDetail(id) {
        dispatch(setReservationDet(id));
    }

    return (
        <animated.div style={props} className={`${reservations ? `reservation__espace__container` : `reservation__espace__empty__container`}`}>
            {
                reservations 
                ?
                    reservations.map(({_id, title, image, lieu, features, price, type}) => (
                        <div className="reservation__espace__produit" onClick={() => handleDetail(_id)} key={_id}>
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
                    <div className="reservation__espace__empty">
                        <img src={empty} alt="empty" className="reservation__espace__empty__img" />
                    </div>
                )
                
            }
        </animated.div>
    )
}

export default EspaceReservations;
