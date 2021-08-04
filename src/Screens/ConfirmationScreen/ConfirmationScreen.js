import React from 'react';
import './ConfirmationScreen.css';
import Header3 from '../../components/Header3/Header3';
import yes from '../../assets/Design/yesGreen.png';
import { useHistory } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

function ConfirmationScreen() {
    const history = useHistory();
    const props = useSpring({
        from: {opacity: 0},
        to: {opacity: 1},
        config: {duration: 600},
    });

    function handleClick() {
        history.push('/clientProfile')
    }

    return (
        <animated.div style={props} className="confirmation__container"> 
            <Header3 />

            <div className="confirmation__card">
                <img src={yes} alt="yes" className="confirmation__yes" />

                <h3>Votre réservation est pris en charge</h3>

                <button className="confirmation__button" onClick={handleClick}>Aller à mes réservation</button>
            </div>
        </animated.div>
    )
}

export default ConfirmationScreen
