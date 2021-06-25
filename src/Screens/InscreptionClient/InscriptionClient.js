import React from 'react';
import './InscriptionClient.css';
import Header1 from '../../components/Header1/Header1';
import { useHistory } from 'react-router-dom';

function InscriptionClient() {
    const history = useHistory();

    function login() {
        history.push('/loginchoice');
    }

    return (
        <div className="container_inscriptionClient">
            <div className="background__img" />
            <Header1 />
            <div className="section_inscriptionClient">
                <form>
                    <div className="form__content">
                        <div className="form__contentLeft">
                            <div className="input_inscription">
                                <label htmlFor="nom">Nom</label>
                                <input type="text" placeholder="Nom" id="nom"/>
                            </div>
                            <div className="input_inscription">
                                <label htmlFor="prenom">Prénom</label>
                                <input type="text" placeholder="Prénom" id="prenom"/>
                            </div>
                            <div className="input_inscription">
                                <label htmlFor="tel">Numéro de tél</label>
                                <input type="text" placeholder="Tél" id="tel"/>
                            </div>
                        </div>
                        <div className="form__contentRight">
                            <div className="input_inscription">
                                <label htmlFor="nomEntreprise">Nom d'entreprise</label>
                                <input type="text" placeholder="Entreprise" id="nomEntreprise"/>
                            </div>
                            <div className="input_inscription">
                                <label htmlFor="email">Email</label>
                                <input type="email" placeholder="Email" id="email"/>
                            </div>
                            <div className="input_inscription">
                                <label htmlFor="password">Password</label>
                                <input type="password" placeholder="Password" id="password"/>
                            </div>
                        </div>
                    </div>
                    <button className="button_inscription">Créer un compte</button>
                </form>
                <h3>Déja un membre? <span className="login_inscription" onClick={login}>Login.</span></h3>
            </div>


            <div className="shadow" />
        </div>
    )
}

export default InscriptionClient
