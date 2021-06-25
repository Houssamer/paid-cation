import React from 'react';
import './ShowClient.css';
import Header2 from '../../components/Header2/Header2';
import Product from '../../components/Product/Product';
import hotel from '../../assets/pictures/hotel.jpg';

function ShowClient() {
    return (
        <div className="container__showClient">
            <Header2 />

            <div className="sectionClient__leftSide">
                <form>
                    <div className="input__Client">
                        <label htmlFor="ville">Ville</label>
                        <select name="ville" id="ville">
                            <option value="agadir">Agadir</option>
                            <option value="casablanca">Casablanca</option>
                            <option value="marrakech">Marrakech</option>
                            <option value="essaouira">Essaouira</option>
                        </select>
                    </div>
                    <div className="input__Client">
                        <label htmlFor="type">Type</label>
                        <select name="type" id="type">
                            <option value="hotel">Hôtel</option>
                            <option value="cafe">Cafe</option>
                            <option value="appartement">Appartement</option>
                            <option value="espace">Espace de travail</option>
                        </select>
                    </div>
                    <div className="input__Client">
                        <label htmlFor="date">Date</label>
                        <input type="date" id="date" />
                    </div>
                    <div className="input__Client">
                        <label htmlFor="choix">Jour/Heure</label>
                        <select name="choix" id="choix">
                            <option value="jour">Jour</option>
                            <option value="heure">Heure</option>
                            <option value="both">Les deux</option>
                        </select>
                    </div>

                    <button className="button__Client">Rechercher</button>
                </form>
            </div>
            <div className="sectionClient__rightSide">
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

export default ShowClient
