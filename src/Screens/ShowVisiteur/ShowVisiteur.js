import React, { useEffect, useRef, useState } from 'react';
import './ShowVisiteur.css';
import Header from '../../components/Header/Header';
import Product from '../../components/Product/Product';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../features/productsSlice';
import { useHistory } from 'react-router-dom';
import villes from '../../assets/data/data';
import { useSpring, animated} from 'react-spring';


function ShowVisiteur() {
    const Products = useSelector(selectProducts);
    const [products, setProducts] = useState(Products); 
    const history = useHistory();
    const cityRef = useRef();
    const typeRef = useRef();
    const timingRef = useRef();
    const props = useSpring({
        from: {opacity: 0},
        to: {opacity: 1},
        config: {duration: 800}
    })

    useEffect(() => {
        setProducts(Products)
    }, [Products])

    

    function filter(event) {
        event.preventDefault();
        const city = cityRef.current.value;
        const type = typeRef.current.value;
        const timing = timingRef.current.value;
        const timingBool = (product) => {
            switch(timing) {
                case "jour":
                    if (product.timing[0] === "jour") {
                        return true;
                    } else {
                        return false;
                    }
                case "heure":
                    if (product.timing[0] === "heure" || product.timing[1] === "heure") {
                        return true;
                    } else {
                        return false;
                    }
                case "both":
                    if (product.timing[0] === "jour" && product.timing[1] === "heure") {
                        return true;
                    } else {
                        return false;
                    }
                default:
                    break;
            }
        }

        setProducts(Products.filter((product) => (
            product.ville === city &&
            product.type === type &&
            timingBool(product)
        )))
    }

    function handleClick(id) {
        history.push(`/product/${id}`);
    }
    

    return (
        <div className="container__showVisiteur">
            <Header />

            <div className="sectionVisiteur__leftSide">
                <form>
                    <div className="input__visiteur">
                        <label htmlFor="ville">Ville</label>
                        <select name="ville" id="ville" ref={cityRef}>
                        {villes.map((ville, index) => (
                            <option value={ville} key={index}>{ville}</option>
                        ))}
                        </select>
                    </div>
                    <div className="input__visiteur">
                        <label htmlFor="type">Type</label>
                        <select name="type" id="type" ref={typeRef}>
                            <option value="hotel">Hôtel</option>
                            <option value="cafe">Cafe</option>
                            <option value="appartement">Appartement</option>
                            <option value="espace">Espace de travail</option>
                        </select>
                    </div>
                    <div className="input__visiteur">
                        <label htmlFor="date">Date</label>
                        <input type="date" id="date" />
                    </div>
                    <div className="input__visiteur">
                        <label htmlFor="choix">Jour/Heure</label>
                        <select name="choix" id="choix" ref={timingRef}>
                            <option value="jour">Jour</option>
                            <option value="heure">Heure</option>
                            <option value="both">Les deux</option>
                        </select>
                    </div>

                    <button className="button__visiteur" onClick={filter}>Rechercher</button>
                </form>
            </div>
            <div className="sectionVisiteur__rightSide">
            {products.map((product, index) => (
                <animated.div style={props} onClick={() => handleClick(product.id)} key={index}>
                    <Product
                        title={product.title}
                        image={product.images[0]}
                        type={product.type}
                        features={product.features}
                        lieu={product.lieu}
                        price={product.price}
                    />                    
                </animated.div>
                ))}
            </div>
        </div>
    )
}

export default ShowVisiteur
