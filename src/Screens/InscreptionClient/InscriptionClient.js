import React, { useRef } from 'react';
import './InscriptionClient.css';
import Header1 from '../../components/Header1/Header1';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from '../../axios/axios';
import { Login, Logout } from '../../features/userSlice';

function InscriptionClient() {
    const history = useHistory();
    const dispatch = useDispatch();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const telRef = useRef();
    const entrepriseRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    function login() {
        history.push('/loginchoice');
    }

    function handleSignUp(event) {
        event.preventDefault();

        const body = JSON.stringify({
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            num: telRef.current.value,
            entreprise: entrepriseRef.current.value,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        axios.post('/api/users/add/client', body, config)
             .then((res) => {
                localStorage.setItem('token', res.data.token);
                dispatch(Login({
                    token: localStorage.getItem('token'),
                    id: res.data.user._id,
                    email: res.data.user.email,
                    firstName: res.data.user.firstName,
                    lastName: res.data.user.lastName,
                    num: res.data.user.num,
                    role: res.data.user.role,
                    entreprise: entrepriseRef.current.value,
                }));
                history.push('/');
             })
             .catch((err) => {
                 dispatch(Logout());
                 localStorage.removeItem('token');
                 alert(err.response.data.message);
             })
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
                                <input type="text" placeholder="Nom" id="nom" required ref={lastNameRef} />
                            </div>
                            <div className="input_inscription">
                                <label htmlFor="prenom">Prénom</label>
                                <input type="text" placeholder="Prénom" id="prenom" required ref={firstNameRef} />
                            </div>
                            <div className="input_inscription">
                                <label htmlFor="tel">Numéro de tél</label>
                                <input type="text" placeholder="Tél" id="tel" required ref={telRef} />
                            </div>
                        </div>
                        <div className="form__contentRight">
                            <div className="input_inscription">
                                <label htmlFor="nomEntreprise">Nom d'entreprise</label>
                                <input type="text" placeholder="Entreprise" id="nomEntreprise" ref={entrepriseRef} />
                            </div>
                            <div className="input_inscription">
                                <label htmlFor="email">Email</label>
                                <input type="email" placeholder="Email" id="email" required ref={emailRef} />
                            </div>
                            <div className="input_inscription">
                                <label htmlFor="password">Password</label>
                                <input type="password" placeholder="Password" id="password" required ref={passwordRef} />
                            </div>
                        </div>
                    </div>
                    <button className="button_inscription" onClick={(event) => handleSignUp(event)}>Créer un compte</button>
                </form>
                <h3>Déja un membre? <span className="login_inscription" onClick={login}>Login.</span></h3>
            </div>


            <div className="shadow" />
        </div>
    )
}

export default InscriptionClient
