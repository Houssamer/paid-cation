import React from 'react';
import './ShowVisiteur.css';
import Header from '../../components/Header/Header';
import Product from '../../components/Product/Product';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../features/productsSlice';
import { useHistory } from 'react-router-dom';

function ShowVisiteur() {
    const products = useSelector(selectProducts);

    const history = useHistory();

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
                        <select name="ville" id="ville">
                            <option value="agadir">Agadir</option>
                            <option value="casablanca">Casablanca</option>
                            <option value="marrakech">Marrakech</option>
                            <option value="essaouira">Essaouira</option>
                        </select>
                    </div>
                    <div className="input__visiteur">
                        <label htmlFor="type">Type</label>
                        <select name="type" id="type">
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
                        <select name="choix" id="choix">
                            <option value="jour">Jour</option>
                            <option value="heure">Heure</option>
                            <option value="both">Les deux</option>
                        </select>
                    </div>

                    <button className="button__visiteur">Rechercher</button>
                </form>
            </div>
            <div className="sectionVisiteur__rightSide">
            {products.map(product => (
                <div onClick={() => handleClick(product.id)}>
                    <Product
                        key={product.id}
                        title={product.title}
                        image={product.images[0]}
                        type={product.type}
                        features={product.features}
                        lieu={product.lieu}
                        price={product.price}
                    />                    
                </div>
                ))}
            </div>
        </div>
    )
}

export default ShowVisiteur
