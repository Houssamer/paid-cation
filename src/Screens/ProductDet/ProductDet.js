import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import './ProductDet.css';
import Header2 from '../../components/Header2/Header2';
import Header from '../../components/Header/Header';
import { useHistory, useParams } from 'react-router-dom';
import left from '../../assets/Design/left.png';
import right from '../../assets/Design/right.png';
import star from '../../assets/Design/star.png';
import axios from '../../axios/axios';
import { useSpring, animated } from 'react-spring'; 


function ProductDet() {
    const user = useSelector(selectUser);
    const [product, setProduct] = useState();
    const [length, setLength] = useState(0);
    const { id } = useParams();
    const [current, setCurrent] = useState(1);
    const history = useHistory();
    const props = useSpring({
        from: {opacity: 0},
        to: {opacity: 1},
        config: {duration: 600},
    });

    useEffect(() => {

        axios.get(`/api/products/${id}`)
             .then((res) => {
                    setProduct(res.data);
                })
                .catch((err) => console.log(err));
    }, [id]);

    useEffect(() => {
        if (product) {
            setLength(product.images.length);
        }
    }, [product])

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
        <animated.div style={props} className="product__detail_container">
            {user ? (<Header2 />) : <Header />}
                {product && (
                    <>
                    <div className="product__detail__leftSide">
                        <div className="product__detail__leftSide__top">
                            <div className="product__detail__left" onClick={prevSlide}>
                                <img src={left} alt="left" />
                            </div>
                            {product.images.map((image, index) => (
                                <div className={index === current ? 'active slide' : 'slide'} key={index}>
                                    {index === current && (
                                        <img src={image} alt="hotel" className="product__detail__image" />
                                    )}
                                </div>
                            ))}
                            <div className="product__detail__type">
                                <h3>{product.type}</h3>
                            </div>
                            <div className="product__detail__right" onClick={nextSlide}> 
                                <img src={right} alt="right" />
                            </div>
                        </div>
                        <div className="product__detail__leftSide__bottom">
                            <div>
                            {
                                Array(product.rate).fill().map((_) => (
                                    <img src={star} alt="star" />
                                ))
                            }
                            </div>
                            {product.timing[0] === "jour" && (<h3>{product.price}/{product.timing[0]}</h3>)}
                            {product.timing[1] === "heure" && (<h3>{product.price}/{product.timing[1]}</h3>)}
                            <button className="product__detail__button" disabled={!user} onClick={() => handleClick(product._id)}>Réserver</button>
                        </div>
                    </div>
                    <div className="product__detail__rightSide">
                        <h1>{product.title}</h1>
                        <p className="description">{product.description}</p>
                        <h3>Points forts</h3>
                        <ul className="product__list__features">
                            {product.features?.map(feature => (
                                <li className="product__feature">{feature}</li>
                            ))}
                        </ul>
                    </div>
                    </>
                )}
            

        </animated.div>
    )
}

export default ProductDet
