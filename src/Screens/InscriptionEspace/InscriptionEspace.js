import React, { useRef } from 'react';
import './InscriptionEspace.css';
import Header1 from '../../components/Header1/Header1';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from '../../axios/axios';
import { Login, Logout } from '../../features/userSlice';
import { useSpring, animated} from 'react-spring';

function InscriptionEspace() {
    const history = useHistory();
    const dispatch = useDispatch();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const telRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const props = useSpring({
        from: {opacity: 0},
        to: {opacity: 1},
        config: {duration: 800}
    })

    function logineEspace() {
        history.push('/loginchoice')
    }

    function handleSignUp(event) {
        event.preventDefault();

        const body = JSON.stringify({
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            num: telRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        axios.post('/api/users/add/gerant', body, config)
             .then((res) => {
                 localStorage.setItem('token', res.data.token);
                 dispatch(Login({
                     token: localStorage.getItem('token'),
                     id: res.data.user.id,
                     email: res.data.user.email,
                     firstName: res.data.user.firstName,
                     lastName: res.data.user.lastName,
                     num: res.data.user.num,
                     role: res.data.user.role,
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
        <div className="container__inscriptionEspace">
            <Header1 />

            <animated.div style={props} className="section__inscriptionEspace">
                <form>
                    <div className="form__inscriptionEspace__leftSide">
                        <div className="input__inscription__espace">
                            <label htmlFor="nom">Nom</label>
                            <input type="text" placeholder="Nom" required ref={lastNameRef} />
                        </div>
                        <div className="input__inscription__espace">
                            <label htmlFor="prenom">Prénom</label>
                            <input type="text" placeholder="Prénom" required ref={firstNameRef} />
                        </div>
                        <div className="input__inscription__espace">
                            <label htmlFor="tel">Numéro de tél</label>
                            <input type="text" placeholder="tel" required ref={telRef} />
                        </div>
                        <div className="input__inscription__espace">
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder="Email" required ref={emailRef} />
                        </div>
                        <div className="input__inscription__espace">
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder="Password" required ref={passwordRef} />
                        </div>
                    </div>
                    <div className="form__inscriptionEspace__rightSide">
                        <button className="button__inscription__espace" onClick={(event) => handleSignUp(event)}>Créer un compte</button>
                        <h3>Déja un membre? <span className="signup__espace" onClick={logineEspace}>Login.</span></h3>
                    </div>
                </form>
            </animated.div>
        </div>
    )
}

export default InscriptionEspace
