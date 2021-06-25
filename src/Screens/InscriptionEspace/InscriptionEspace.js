import React from 'react';
import './InscriptionEspace.css';
import Header1 from '../../components/Header1/Header1';
import { useHistory } from 'react-router-dom';

function InscriptionEspace() {

    const history = useHistory();

    function logineEspace() {
        history.push('/loginchoice')
    }

    return (
        <div className="container__inscriptionEspace">
            <Header1 />

            <div className="section__inscriptionEspace">
                <form>
                    <div className="form__inscriptionEspace__leftSide">
                        <div className="input__inscription__espace">
                            <label htmlFor="nom">Nom</label>
                            <input type="text" placeholder="Nom" />
                        </div>
                        <div className="input__inscription__espace">
                            <label htmlFor="prenom">Prénom</label>
                            <input type="text" placeholder="Prénom" />
                        </div>
                        <div className="input__inscription__espace">
                            <label htmlFor="tel">Numéro de tél</label>
                            <input type="text" placeholder="tel" />
                        </div>
                        <div className="input__inscription__espace">
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder="Email" />
                        </div>
                        <div className="input__inscription__espace">
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder="Password" />
                        </div>
                    </div>
                    <div className="form__inscriptionEspace__rightSide">
                        <button className="button__inscription__espace">Créer un compte</button>
                        <h3>Déja un membre? <span className="signup__espace" onClick={logineEspace}>Login.</span></h3>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default InscriptionEspace
