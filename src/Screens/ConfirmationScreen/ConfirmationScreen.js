import React from 'react';
import './ConfirmationScreen.css';
import Header3 from '../../components/Header3/Header3';
import yes from '../../assets/Design/yesGreen.png';
import { useHistory } from 'react-router-dom';

function ConfirmationScreen() {
    const history = useHistory();

    function handleClick() {
        history.push('/clientProfile')
    }

    return (
        <div className="confirmation__container"> 
            <Header3 />

            <div className="confirmation__card">
                <img src={yes} alt="yes" className="confirmation__yes" />

                <h3>Votre réservation est pris en charge</h3>

                <button className="confirmation__button" onClick={handleClick}>Aller à mes réservation</button>
            </div>
        </div>
    )
}

export default ConfirmationScreen
