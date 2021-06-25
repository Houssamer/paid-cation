import React from 'react';
import './ShowVisiteur.css';
import Header from '../../components/Header/Header';
import Product from '../../components/Product/Product';
import hotel from '../../assets/pictures/hotel.jpg';

function ShowVisiteur() {
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
                <Product 
                    title="Titre de publication" 
                    image={hotel} 
                    lieu="Lieu d'espace" 
                    features={["wifi", "Déjeuner", "Parking"]}
                    price="Prix" 
                    type="Hotel" 
                />
                <Product 
                    title="Titre de publication" 
                    image={hotel} 
                    lieu="Lieu d'espace" 
                    features={["wifi", "Déjeuner", "Parking"]}
                    price="Prix" 
                    type="Hotel" 
                />
                <Product 
                    title="Titre de publication" 
                    image={hotel} 
                    lieu="Lieu d'espace" 
                    features={["wifi", "Déjeuner", "Parking"]}
                    price="Prix" 
                    type="Hotel" 
                />
                <Product 
                    title="Titre de publication" 
                    image={hotel} 
                    lieu="Lieu d'espace" 
                    features={["wifi", "Déjeuner", "Parking"]}
                    price="Prix" 
                    type="Hotel" 
                />
                <Product 
                    title="Titre de publication" 
                    image={hotel} 
                    lieu="Lieu d'espace" 
                    features={["wifi", "Déjeuner", "Parking"]}
                    price="Prix" 
                    type="Hotel" 
                />
                <Product 
                    title="Titre de publication" 
                    image={hotel} 
                    lieu="Lieu d'espace" 
                    features={["wifi", "Déjeuner", "Parking"]}
                    price="Prix" 
                    type="Hotel" 
                />
                <Product 
                    title="Titre de publication" 
                    image={hotel} 
                    lieu="Lieu d'espace" 
                    features={["wifi", "Déjeuner", "Parking"]}
                    price="Prix" 
                    type="Hotel" 
                />
                <Product 
                    title="Titre de publication" 
                    image={hotel} 
                    lieu="Lieu d'espace" 
                    features={["wifi", "Déjeuner", "Parking"]}
                    price="Prix" 
                    type="Hotel" 
                />
                <Product 
                    title="Titre de publication" 
                    image={hotel} 
                    lieu="Lieu d'espace" 
                    features={["wifi", "Déjeuner", "Parking"]}
                    price="Prix" 
                    type="Hotel" 
                />
                <Product 
                    title="Titre de publication" 
                    image={hotel} 
                    lieu="Lieu d'espace" 
                    features={["wifi", "Déjeuner", "Parking"]}
                    price="Prix" 
                    type="Hotel" 
                />
            </div>
        </div>
    )
}

export default ShowVisiteur
