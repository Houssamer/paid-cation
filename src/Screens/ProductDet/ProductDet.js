import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import './ProductDet.css';
import Header2 from '../../components/Header2/Header2';
import Header from '../../components/Header/Header';
import { useHistory, useParams } from 'react-router-dom';
import left from '../../assets/Design/left.png';
import right from '../../assets/Design/right.png';
import { selectProducts } from '../../features/productsSlice';
import star from '../../assets/Design/star.png';

function ProductDet() {
    const user = useSelector(selectUser);
    const products = useSelector(selectProducts);
    const { id } = useParams();
    const product = products.filter(product => product.id === parseInt(id));
    const [current, setCurrent] = useState(0);
    const length = product[0].images.length;
    const history = useHistory();

    function handleClick(id) {
        history.push(`/checkout/${id}`);
    }

    function prevSlide() {
        if (current === 0) {
            setCurrent(length-1);
        } else {
            setCurrent(current-1);
        }
    }

    function nextSlide() {
        if (current === length - 1) {
            setCurrent(0);
        } else {
            setCurrent(current+1);
        }

    }

    return (
        <div className="product__detail_container">
            {user ? (<Header2 />) : <Header />}
            
            <div className="product__detail__leftSide">
                <div className="product__detail__leftSide__top">
                    <div className="product__detail__left" onClick={prevSlide}>
                        <img src={left} alt="left" />
                    </div>
                    {product[0].images?.map((image, index) => (
                        <div className={index === current ? 'active slide' : 'slide'} key={index}>
                            {index === current && (
                                <img src={image} alt="hotel" className="product__detail__image" />
                            )}
                        </div>
                    ))}
                    <div className="product__detail__type">
                        <h3>{product[0].type}</h3>
                    </div>
                    <div className="product__detail__right" onClick={nextSlide}> 
                        <img src={right} alt="right" />
                    </div>
                </div>
                <div className="product__detail__leftSide__bottom">
                    <div>
                    {
                        Array(product[0].rate).fill().map((_) => (
                            <img src={star} alt="star" />
                        ))
                    }
                    </div>
                    {product[0].timing[0] === "Jour" && (<h3>{product[0].price}DH/{product[0].timing[0]}</h3>)}
                    {product[0].timing[1] === "Heure" && (<h3>{product[0].price}DH/{product[0].timing[1]}</h3>)}
                    <button className="product__detail__button" disabled={!user} onClick={() => handleClick(product[0].id)}>Réserver</button>
                </div>
            </div>
            <div className="product__detail__rightSide">
                <h1>{product[0].title}</h1>
                <p className="description">{product[0].description}</p>
                <h3>Points forts</h3>
                <ul className="product__list__features">
                    {product[0].features?.map(feature => (
                        <li className="product__feature">{feature}</li>
                    ))}
                </ul>
            </div>

        </div>
    )
}

export default ProductDet
