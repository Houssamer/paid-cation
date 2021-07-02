import React, { useRef, useState } from 'react';
import './CheckoutScreen.css';
import Header3 from '../../components/Header3/Header3';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../features/productsSlice';
import { useHistory, useParams } from 'react-router-dom';
import Product from '../../components/Product/Product';
import moment from 'moment';

function CheckoutScreen() {
    const products = useSelector(selectProducts);
    const { id } = useParams();
    const product = products.filter(product => product.id === parseInt(id))
    const day = product[0].timing[0] === "Jour";
    const hour = product[0].timing[1] === "Hour";
    const [active, setActive] = useState(false);
    const [jour, setJour] = useState(true);
    const [price, setPrice] = useState(0)
    const arriveDayRef = useRef();
    const departDayRef = useRef();
    const DayRef = useRef();
    const arriveHourRef = useRef();
    const departHourRef = useRef();
    const history = useHistory();

    function HandleDay() {
        setJour(true);
        setActive(true);
        console.log(moment().format('L'));
    }

    function handleClick() {
        history.push('/confirmation');
    }

    function HandleHour() {
        setJour(false);
        setActive(false);
    }

    function handleDay() {
        const arrivee = new Date(arriveDayRef.current.value);
        const depart = new Date(departDayRef.current.value);

        const differenceDay = Math.abs(depart?.getTime() - arrivee?.getTime())/(1000 * 3600 * 24);

        if (differenceDay > 0) {
            setPrice(product[0].price*differenceDay);
        } else {
            alert("Entrez une date supérieure à celle d'arrivée");
        }
    }

    function handleTime() {
        const day = DayRef.current.value;
        const arrive = arriveHourRef.current.value;
        const depart = departHourRef.current.value;

        const DateArrivee = new Date(`${day} ${arrive}`);

        const DateDepart = new Date(`${day} ${depart}`)

        let differenceHour = DateDepart.getHours() - DateArrivee.getHours();
        let differenceMinute = DateDepart.getMinutes() - DateArrivee.getMinutes();

        if (differenceMinute > 0) {
            differenceHour++;
        }

        if (differenceHour < 0) {
            differenceHour = 24 + differenceHour;
        }

        if (differenceHour > 0) {
            setPrice(product[0].price*differenceHour);
        } else {
            alert("Entrez une date supérieure à celle d'arrivée")
        }
        
    }

    return (
        <div className="checkout__container">
            <Header3 />
            <div className="checkout__leftSide">
                <Product 
                    title={product[0].title}
                    lieu={product[0].lieu}
                    image={product[0].images[0]}
                    price={product[0].price}
                    features={product[0].features}
                    type={product[0].type}
                />

                <button className="checkout__leftSide__button" onClick={handleClick}>Réserver</button>
            </div>

            <div className="checkout__line" />

            <div className="checkout__rightSide">
                <div className="checkout__rightSide__buttons">
                    <button 
                        className={`checkout__rightSide__button ${jour && `checkout__button__active`}`}
                        onClick={HandleDay}
                    >
                        Jours
                    </button>
                    <button 
                        className={`checkout__rightSide__button ${!jour && `checkout__button__active`}`}
                        onClick={HandleHour}
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
                                    <label htmlFor="nombre">Nomvre de membres</label>
                                    <input type="number" id="nombre" min="0" placeholder="0" />
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
                                    <input type="number" id="nombre" min="0" placeholder="0" />
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
        </div>
    )
}

export default CheckoutScreen
