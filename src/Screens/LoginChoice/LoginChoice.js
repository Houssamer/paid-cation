import React, { useState } from 'react';
import './LoginChoice.css';
import Header1 from '../../components/Header1/Header1';
import arrow from '../../assets/Design/blue.png'
import { useHistory } from 'react-router-dom';

function LoginChoice() {
    const [client, setClient] = useState(false);
    const [espace, setEspace] = useState(false);
    const history = useHistory();
    
    function inscriptionClient() {
        history.push('/InscriptionClient');   
    }

    function inscriptionEspace() {
        history.push('/InscriptionEspace');
    }

    return (
        <div className="container">
            <Header1 />
            <div className="section">
                <div className="background__img" />
                {(!client && !espace) ? (
                <div className="section__content">
                    <h1>Bienvenue Dans PAID-CATION</h1>
                    <div className="section__buttons">
                        <button className="button" onClick={() => setClient(true)}>Je veux réserver un espace</button>
                        <button className="button" onClick={() => setEspace(true)}>Je veux publier mon espace</button>
                    </div>
                </div>
                ) : (
                    !espace ? 
                    (<div className="login">
                        <img src={arrow} alt="arrow" className="arrow" onClick={() => {setEspace(false); setClient(false);}} />
                        <form>
                            <div className="input">
                            <label htmlFor="email" className="label">Email</label>
                            <input type="email" placeholder="Email" />
                            </div>
                            <div className="input">
                            <label htmlFor="email" className="label">Password</label>
                            <input type="password" placeholder="Password" />
                            </div>
                            <button className="submit">Login</button>
                        </form>
                        <h3>Pas un membre? <span className="signUp" onClick={inscriptionClient}>Créer un compte.</span></h3>
                    </div>)
                    : (
                        <div className="login">
                        <img src={arrow} alt="arrow" className="arrow" onClick={() => {setClient(false); setEspace(false);}} />
                        <form>
                            <div className="input">
                            <label htmlFor="email" className="label">Email</label>
                            <input type="email" placeholder="Email" />
                            </div>
                            <div className="input">
                            <label htmlFor="email" className="label">Password</label>
                            <input type="password" placeholder="Password" />
                            </div>
                            <button className="submit">Login</button>
                        </form>
                        <h3>Pas un membre? <span className="signUp" onClick={inscriptionEspace}>Créer un compte.</span></h3>
                    </div>
                    )
                )}
            <div className="shadow" />
            </div>
        </div>
    )
}

export default LoginChoice
