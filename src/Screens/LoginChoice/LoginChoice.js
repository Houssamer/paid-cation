import React, { useRef, useState } from 'react';
import './LoginChoice.css';
import Header1 from '../../components/Header1/Header1';
import arrow from '../../assets/Design/blue.png'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from '../../axios/axios';
import { Login, Logout } from '../../features/userSlice';
import { useSpring, animated } from 'react-spring';

function LoginChoice() {
    const [client, setClient] = useState(false);
    const [espace, setEspace] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const emailClientRef = useRef();
    const passwordClientRef = useRef();
    const emailEspaceRef = useRef();
    const passwordEspaceRef = useRef();
    const props = useSpring({
        from: {opacity: 0},
        to: {opacity: 1},
        config: {duration: 600},
    });
    const props1 = useSpring({
        y: espace ? 0 : 1000,
        x: espace && 0,
        config: {duration: 500},
    });
    const props2 = useSpring({
        opacity: client ? 1 : 0,
        config: {duration: 500},
    });
    
    function inscriptionClient() {
        history.push('/InscriptionClient');   
    }

    function inscriptionEspace() {
        history.push('/InscriptionEspace');
    }

    function handleSignInClient(event) {
        event.preventDefault();

        const body = JSON.stringify({
            email: emailClientRef.current.value,
            password: passwordClientRef.current.value,
        });

        const config =  {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        axios.post('/api/auth', body, config)
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
                     image: res.data.user?.image,
                 }))
                 window.location.reload(false);
                 history.push('/');
             })
             .catch((err) => {
                dispatch(Logout());
                localStorage.removeItem('token');
                alert(err.response.data.message);
            })
    }

    function handleSignInEspace(event) {
        event.preventDefault();

        const body = JSON.stringify({
            email: emailEspaceRef.current.value,
            password: passwordEspaceRef.current.value,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        axios.post('/api/auth', body, config)
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
                     image: res.data.user?.image,
                 }))
                 history.push('/');
                 window.location.reload(false);
             })
             .catch((err) => {
                 dispatch(Logout());
                 localStorage.removeItem('token');
                 alert(err.response.data.message);
             })
    }

    return (
        <animated.div style={props} className="container">
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
                    (<animated.div style={props2} className="login">
                        <img src={arrow} alt="arrow" className="arrow" onClick={() => {setEspace(false); setClient(false);}} />
                        <form>
                            <div className="input">
                            <label htmlFor="email" className="label">Email</label>
                            <input type="email" placeholder="Email" ref={emailClientRef} />
                            </div>
                            <div className="input">
                            <label htmlFor="email" className="label">Password</label>
                            <input type="password" placeholder="Password" ref={passwordClientRef} />
                            </div>
                            <button className="submit" onClick={(event) => handleSignInClient(event)}>Login</button>
                        </form>
                        <h3>Pas un membre? <span className="signUp" onClick={inscriptionClient}>Créer un compte.</span></h3>
                    </animated.div>)
                    : (
                        <animated.div style={props1} className="login">
                        <img src={arrow} alt="arrow" className="arrow" onClick={() => {setClient(false); setEspace(false);}} />
                        <form>
                            <div className="input">
                            <label htmlFor="email" className="label">Email</label>
                            <input type="email" placeholder="Email" ref={emailEspaceRef} />
                            </div>
                            <div className="input">
                            <label htmlFor="email" className="label">Password</label>
                            <input type="password" placeholder="Password" ref={passwordEspaceRef} />
                            </div>
                            <button className="submit" onClick={(event) => handleSignInEspace(event)}>Login</button>
                        </form>
                        <h3>Pas un membre? <span className="signUp" onClick={inscriptionEspace}>Créer un compte.</span></h3>
                    </animated.div>
                    )
                )}
            <div className="shadow" />
            </div>
        </animated.div>
    )
}

export default LoginChoice
