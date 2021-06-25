import React from 'react';
import Header from '../../components/Header/Header';
import './style.css';
import img from '../../assets/pictures/img.png';
import dollar from '../../assets/Design/dollar.png';
import yes from '../../assets/Design/yes.png';
import one from '../../assets/Design/one.png';
import facebook from '../../assets/Design/facebook.svg';
import instagram from '../../assets/Design/instagram.svg';
import linkedin from '../../assets/Design/linkedin.svg';
import { useHistory } from 'react-router-dom';

function HomeScreen() {
    const history = useHistory();

    function rechercher(event) {
        event.preventDefault();
        history.push('/visiteur');
    }

    return (
        <div className="homeScreen">
            <Header />
            <div className="section1">
            <div className="homeScreen__background" />

            <div className="section1__content">
                <h1>Travaillez de n'importe où</h1>
                <h3>Fini le stress au travail</h3>
                <p>Réserver un bureau pour vous où votre équipe et vivre comme si vous êtes en vacances</p>
                <button className="section1__button" onClick={rechercher}>Réserver maintenant</button>
            </div>
            
            <div className="homeScreen__shadow" /> 
            </div>

            <div className="section2">
                <div className="section2__leftSide">
                    <img src={img} alt="right" className="section2__img" />
                </div>
                <div className="section2__rightSide">
                    <h3 className="section2__title">Bienvenue dans Paid-Cation</h3>
                    <p className="section2__description">
                        le site où vous trouverez votre espace
                        de travail de rêve. Dis au revoir au stress du travail
                        et vivre comme si vous êtes en vacances. Augmenter 
                        la créativté de votre équipe.
                    </p>
                </div>
            </div>

            <div className="section3">
                <div className="searchBar">
                    <form>
                        <div className="input">
                            <label htmlFor="city">Ville:</label>
                            <select name="Ville" id="city">
                                <option value="agadir">Agadir</option>
                                <option value="casablanca">Casablanca</option>
                                <option value="marrakech">Marrakech</option>
                                <option value="essaouira">Essaouira</option>
                            </select>
                        </div>
                        <div className="input">
                            <label htmlFor="date">Date:</label>
                            <input type="date" />
                        </div>
                        <div className="input">
                            <label htmlFor="type">Type:</label>
                            <select name="type" id="type">
                                <option value="hotel">Hôtel</option>
                                <option value="cafe">Cafe</option>
                                <option value="appartement">Appartement</option>
                                <option value="espace">Espace de Travail</option>
                            </select>
                        </div>
                    </form>
                </div>
                <button className="section3__button" onClick={(event) => rechercher(event)}>Rechercher</button>
            </div>
            <div className="section4">
                <div className="cards">
                    <div className="card">
                        <div className="circle">
                            <img src={dollar} alt="dollar" />
                        </div>
                        <h2>Prix abordable</h2>
                    </div>
                    <div className="card">
                        <div className="circle">
                            <img src={yes} alt="yes" />
                        </div>
                        <h2>Qualité de service</h2>
                    </div>
                    <div className="card">
                        <div className="circle">
                            <img src={one} alt="one" />
                        </div>
                        <h2>Premier site au Maroc</h2>
                    </div>
                </div>
                <div className="social__media">
                    <div className="facebook">
                        <img src={facebook} alt="facebook" className="facebookIcon" />
                    </div>
                    <div className="instagram">
                        <img src={instagram} alt="instagram" className="instagramIcon" />
                    </div>
                    <div className="linkedin">
                        <img src={linkedin} alt="linkedin" className="linkedinIcon" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeScreen;
