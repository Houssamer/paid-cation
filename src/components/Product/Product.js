import React from 'react';
import './Product.css';

function Product({title, image, lieu, features, price, type}) {



    return (
        <div className="container__product">
            <div className="type">
                <h3>{type}</h3>
            </div>
            
            <div className="product__topSide">
                <img src={image} alt="view" className="product__img" />
            </div>

            <div className="product__bottomSide">
                <h2>{title}</h2>
                <h4>{lieu}</h4>
                <div className="features">
                    {features?.map(feature => (
                        <h5>{feature}</h5>
                    ))}
                </div>

                <button className="product__button">{price}</button>
            </div>
        </div>
    )
}

export default Product;
