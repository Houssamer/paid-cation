import React, { useEffect, useRef, useState } from 'react';
import './CheckoutScreen.css';
import Header3 from '../../components/Header3/Header3';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Product from '../../components/Product/Product';
import moment from 'moment';
import axios from '../../axios/axios';
import { selectUser } from '../../features/userSlice';
import swal from 'sweetalert';


function CheckoutScreen() {
    const user = useSelector(selectUser);
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [day, setDay] = useState(false);
    const [hour, setHour] = useState(false);
    const [active, setActive] = useState(true);
    const [jour, setJour] = useState(true);
    const [price, setPrice] = useState(0);
    const [durationDay, setDurationDay] = useState(0);
    const [durationHour, setDurationHour] = useState(0);
    const arriveDayRef = useRef();
    const departDayRef = useRef();
    const nombreMembreRef = useRef();
    const DayRef = useRef();
    const arriveHourRef = useRef();
    const departHourRef = useRef();
    const history = useHistory();

    useEffect(() => {
        
        axios.get(`/api/products/${id}`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => console.log(err));

    }, [id]);

    useEffect(() => {
        if (product) {
            setDay(product.timing[0] === "jour");
            setHour(product.timing[0] === "heure" || product.timing[1] === "heure");
            setJour(product.timing[0] === "jour");
            setActive(product.timing[0] === "jour");
        }
    }, [product])

    function HandleDay() {
        setJour(true);
        setActive(true);
    }

    function HandleHour() {
        setJour(false);
        setActive(false);
    }

    function handleClick() {

        if (active) {
            const arriveDay = Date.parse(arriveDayRef.current.value);
            const departDay = Date.parse(departDayRef.current.value);
            const nombreMembre = nombreMembreRef.current.value;

            if (!arriveDay || !departDay || !nombreMembre) {
                swal("Erreur", "Veuillez entrer toutes les champs", "error");
            } else {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.getItem('token'),
                    },
                };

                const bodyDispo = JSON.stringify({
                    product_id: id,
                    date_depart: departDay,
                    date_arrivee: arriveDay,
                });


                axios.post('/api/reservations/dispo/verify/day', bodyDispo, config)
                     .then(() => {
                         axios.post('/api/reservations/dispo/add/day', bodyDispo, config)
                              .then(() => {
                                  axios.get(`/api/users/${product.owner_id}`)
                                       .then((res) => {
                                            const body = JSON.stringify({
                                                user_id: user.id,
                                                product_id: id,
                                                owner_id: product.owner_id,
                                                nombreMembres: nombreMembre,
                                                price: price + 'DH',
                                                duree: durationDay + 'jours',
                                                date_depart: departDay,
                                                date_arrivee: arriveDay,
                                                image: product.images[0],
                                                num: res.data.num,
                                                email: res.data.email
                                            });
                        
                                           axios.post('/api/reservations/add/day', body, config)
                                                .then(() => {
                                                    swal({
                                                        title: "Bien",
                                                        text: "Votre réservation est pris en charge",
                                                        icon: "success",
                                                        button: null,
                                                    })
                                                    setTimeout(() => {
                                                         history.push('/confirmation');
                                                         window.location.reload(false);
                                                    }, 2000);
                                                })
                                                .catch((err) => swal("Erreur", err.response.data.message, "error")); 
                                       })
                                       .catch((err) => swal("Erreur", err.response.data.message, "error"))
                              })
                              .catch((err) => swal("Erreur", err.response.data.message, "error"));
                     })
                     .catch((err) => swal("Erreur", "La date est indisponible", "error"));
            }

        } else {
            const arrive = arriveHourRef.current.value;
            const depart = departHourRef.current.value;
            const day = DayRef.current.value;
            const arriveeHour = Date.parse(new Date(`${day} ${arrive}`));
            const departHour = Date.parse(new Date(`${day} ${depart}`));
            const nombreMembre = nombreMembreRef.current.value;

            if (!day || !arriveeHour || !departHour || !nombreMembre) {
                swal("Erreur", "Veuillez entrer tous les champs", "error");
            } else {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.getItem('token'),
                    },
                };

                const bodyDispo = JSON.stringify({
                    product_id: id,
                    date_arrivee: arriveeHour,
                    date_depart: departHour,
                    day: day,
                })

                axios.post('/api/reservations/dispo/verify/hour', bodyDispo, config)
                     .then(() => {
                         axios.post('/api/reservations/dispo/add/hour', bodyDispo, config)
                              .then(() => {
                                  axios.get(`/api/users/${product.owner_id}`)
                                       .then((res) => {
                                            const body = JSON.stringify({
                                                day: day,
                                                date_arrivee: arriveeHour,
                                                date_depart: departHour,
                                                nombreMembres: nombreMembre,
                                                price: price + 'DH',
                                                user_id: user.id,
                                                product_id: id,
                                                owner_id: product.owner_id,
                                                duree: durationHour + "heures",
                                                image: product.images[0],
                                                num: res.data.num,
                                                email: res.data.email,
                                            })

                                            axios.post('/api/reservations/add/hour', body, config)
                                                 .then(() => {
                                                     swal({
                                                         title: "Bien",
                                                         text: "Votre réservations est pris en charge",
                                                         icon: "success",
                                                         button: null,
                                                     })

                                                     setTimeout(() => {
                                                         history.push('/confirmation');
                                                         window.location.reload(false);
                                                     }, 2000);
                                                 })
                                                 .catch((err) => {
                                                     swal("Erreur", err.response.data.message, "error");
                                                 })
                                       })
                                       .catch((err) => {
                                           swal("Erreur", err.response.data.message, "error");
                                       })
                              })
                              .catch((err) => {
                                  swal("Erreur", err.response.data.message, "error");
                              })
                     })
                     .catch((err) => {
                         swal("Erreur", "La date est indisponible", "error");
                     });

            }
        }

    }


    function handleDay() {
        const arrivee = arriveDayRef.current.value ? new Date(arriveDayRef.current.value) : null;
        const depart = departDayRef.current.value ? new Date(departDayRef.current.value) : null;
        if (arrivee && depart) {
            const differenceDay = (depart?.getTime() - arrivee?.getTime())/(1000 * 3600 * 24);
            if (differenceDay > 0) {
                setPrice(parseInt(product.price)*differenceDay);
                setDurationDay(differenceDay);
            } else {
                    swal("Erreur", "Entrez une date supérieure à celle d'arrivée", "error");
            }
        }
    }

    function handleTime() {
        const day = DayRef.current.value;
        const arrive = arriveHourRef.current.value;
        const depart = departHourRef.current.value;

        const DateArrivee = arrive ? new Date(`${day} ${arrive}`) : null;
        const DateDepart = depart ? new Date(`${day} ${depart}`) : null;

        if (DateArrivee && DateDepart) {
            let differenceHour = DateDepart.getHours() - DateArrivee.getHours();
            let differenceMinute = DateDepart.getMinutes() - DateArrivee.getMinutes();
    
            if (differenceMinute > 0) {
                differenceHour++;
            }
    
            if (differenceHour < 0) {
                differenceHour = 24 + differenceHour;
            }
    
            if (differenceHour > 0) {
                setPrice(parseInt(product.price)*differenceHour);
                setDurationHour(differenceHour);
            } else {
                swal("Erreur", "Entrez une date supérieure à celle d'arrivée", "error");
            }
        }
    }

    return (
        <div className="checkout__container">
            <Header3 />
            {product && (
                <>
                <div className="checkout__leftSide">
                    <Product 
                        title={product.title}
                        lieu={product.lieu}
                        image={product.images[0]}
                        price={product.price}
                        features={product.features}
                        type={product.type}
                    />

                    <button className="checkout__leftSide__button" onClick={handleClick}>Réserver</button>
                </div>

                <div className="checkout__line" />

                <div className="checkout__rightSide">
                    <div className="checkout__rightSide__buttons">
                        <button 
                            className={`checkout__rightSide__button ${jour && `checkout__button__active`}`}
                            onClick={HandleDay}
                            disabled={!day}
                        >
                            Jours
                        </button>
                        <button 
                            className={`checkout__rightSide__button ${!jour && `checkout__button__active`}`}
                            onClick={HandleHour}
                            disabled={!hour}
                        >
                            Heures
                        </button>
                    </div>
                    {
                        active ?
                        (
                            <div className="checkout__day">
                                <form>
                                    <div className="checkout__day__input">
                                        <label htmlFor="arrive">Arrivée</label>
                                        <input 
                                            type="date" 
                                            id="arrive" 
                                            ref={arriveDayRef} 
                                            onChange={handleDay} 
                                            min={moment().format("YYYY-MM-DD")}
                                        />
                                    </div>
                                    <div className="checkout__day__input">
                                        <label htmlFor="depart">Départ</label>
                                        <input 
                                            type="date" 
                                            id="depart" 
                                            ref={departDayRef} 
                                            onChange={handleDay}
                                            min={moment().format("YYYY-MM-DD")}
                                        />
                                    </div>
                                    <div className="checkout__day__input">
                                        <label htmlFor="nombre">Nombre de membres</label>
                                        <input type="number" id="nombre" min="0" placeholder="0" ref={nombreMembreRef} />
                                    </div>
                                </form>

                                <div className="checkout__day__price">
                                    <h3>{price}</h3>
                                    <h3>MAD</h3>
                                </div>
                            </div>
                        )
                        : 
                        (
                            <div className="checkout__hour">
                                <form>
                                    <div className="checkout__hour__input one">
                                        <label htmlFor="day">Jour</label>
                                        <input 
                                            type="date" 
                                            id="day" 
                                            ref={DayRef}
                                            onChange={handleTime}
                                        />
                                    </div>
                                    <div className="checkout__hour__input two">
                                        <label htmlFor="arrive">Arrivée</label>
                                        <input 
                                            type="time" 
                                            id="arrive" 
                                            ref={arriveHourRef}
                                            onChange={handleTime}
                                        />
                                    </div>
                                    <div className="checkout__hour__input three">
                                        <label htmlFor="depart">Départ</label>
                                        <input 
                                            type="time" 
                                            id="depart" 
                                            ref={departHourRef} 
                                            onChange={handleTime}
                                        />
                                    </div>
                                    <div className="checkout__hour__input four">
                                        <label htmlFor="nombre">Nombre de membres</label>
                                        <input type="number" id="nombre" min="0" placeholder="0" ref={nombreMembreRef} />
                                    </div>
                                </form>
                                <div className="checkout__hour__price">
                                    <h3>{price}</h3>
                                    <h3>MAD</h3>
                                </div>
                            </div>
                        )
                    }
                </div>
            </>
            )}
        </div>
    )
}

export default CheckoutScreen
