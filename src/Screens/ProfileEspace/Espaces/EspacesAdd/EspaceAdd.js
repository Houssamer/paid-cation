import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../../features/userSlice';
import './EspaceAdd.css';
import axios from '../../../../axios/axios';
import { selectProducts, setProducts } from '../../../../features/productsSlice';
import swal from 'sweetalert';
import villes from '../../../../assets/data/data';
import { useSpring, animated } from 'react-spring';



function EspaceAdd() {
    const user = useSelector(selectUser);
    const products = useSelector(selectProducts);
    const dispatch = useDispatch();
    const [images, setImages] = useState();
    const [imagesRef, setImagesRef] = useState(null);
    const [img, setImg] = useState(null);
    const [tags, setTags] = useState(null);
    const fileInputRef = useRef();
    const titleRef = useRef();
    const lieuRef = useRef();
    const priceRef = useRef();
    const typeRef = useRef();
    const timingRef = useRef();
    const rateRef = useRef();
    const villeRef = useRef();
    const descriptionRef = useRef();
    const props = useSpring({
        from: {opacity: 0},
        to: {opacity: 1},
        config: {duration: 600},
    });

    useEffect(() => {
        if (img) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (images === null) {
                    setImages([reader.result])
                } else {
                    setImages([...images, reader.result]);
                }
            }

            reader.readAsDataURL(img);
        } else {
            setImages(null);
        }
    }, [img])
    
    function removeTags(indexToRemove) {
        setTags([...tags.filter((_,index) => index !== indexToRemove)]);
    }

    function addTags(event) {
        if (event.target.value !== "") {
            if (tags === null) {
                setTags([event.target.value]);
                event.target.value="";
            } else {
                setTags([...tags, event.target.value])
                event.target.value = "";
            }
        }
    }

    function handleClick() {
        fileInputRef.current.click();
    }

     function handleFileInput(event) {
         if (images === null) {
            const file = event.target.files[0];
            if (file && file.type.substring(0,5) === "image") {
                setImg(file);
                if (imagesRef === null) {
                    setImagesRef([file]);
                } else {
                    setImagesRef([...imagesRef, file]);
                }
            } else {
                setImg(null);
            }
         } else {
             if (images.length < 7) {
                 const file = event.target.files[0];
                 if (file && file.type.substring(0,5) === "image") {
                     setImg(file);
                     if (imagesRef === null) {
                        setImagesRef([file]);
                    } else {
                        setImagesRef([...imagesRef, file]);
                    }
                 } else {
                     setImg(null);
                 }
             } else {
                 alert("Vous pouvez pas ajouter plus que sept images")
             }
         }
         }

    function handleAdd() {
        if (!imagesRef) {
            swal({
                title: "erreur",
                text: "Veuillez entrer au moins une image",
                icon: "error",
                button: "Ok",
            })
        }
        else {
            const form = new FormData();
            imagesRef.forEach((image) => {
                form.append('multi-files-add', image);
            });
    
            const timing = timingRef.current.value === "both" ? ["jour", "heure"] : timingRef.current.value;
            
            const body = JSON.stringify({
                owner_id: user.id,
                title: titleRef.current.value,
                lieu: lieuRef.current.value,
                features: tags,
                price: priceRef.current.value + "DH",
                type: typeRef.current.value,
                timing,
                rate: rateRef.current.value,
                ville: villeRef.current.value,
                description: descriptionRef.current.value,
            })
    
            const configInfo = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token'),
                },
            };
    
            const configImg = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': localStorage.getItem('token'),
                }
            }
    
            axios.post('/api/products/add', body, configInfo)
                 .then((res) => {
                     axios.post(`/api/products/add/image/${res.data.product._id}`, form, configImg)
                          .then(() => {
                              dispatch(setProducts([
                                  ...products,
                                  {
                                      id: res.data.product.id,
                                      owner_id: res.data.product.owner_id,
                                      title: res.data.product.title,
                                      images: res.data.product.images,
                                      lieu: res.data.product.lieu,
                                      features: res.data.product.features,
                                      price: res.data.product.price,
                                      type: res.data.product.type,
                                      timing: res.data.product.timing,
                                      rate: res.data.product.rate,
                                      ville: res.data.product.ville,
                                      description: res.data.product.decription,
                                  }
                              ]))

                              swal({
                                title: "Bien",
                                text: "Le produit est bien ajouté",
                                icon: "success",
                                button: null,
                            });
                            setTimeout(() => {
                                window.location.reload(false);
                            }, 2000);
                          })
                          .catch((err) => {
                            swal({
                                title: "Erreur",
                                text: err.response.data.message,
                                icon: "error",
                                button: "Ok",
                            })
                          })
                 })
                 .catch((err) => {
                     swal({
                         title: "Erreur",
                         text: err.response.data.message,
                         icon: "error",
                         button: "Ok",
                     })
                 })
        }
    }

    return (
        <animated.div style={props} className="espace__add__container">
            <div className="espace__add__leftSide">
                <form>
                    <div className="espace__add__input">
                        <label htmlFor="title">Titre</label>
                        <input type="text" id="title" placeholder="titre" required ref={titleRef} />
                    </div>
                    <div className="espace__add__input">
                        <label htmlFor="lieu">Lieu</label>
                        <input type="text" id="lieu" placeholder="Lieu" required ref={lieuRef} />
                    </div>
                    <div className="espace__add__input">
                        <label htmlFor="rate">Rate</label>
                        <input type="number" id="rate" placeholder="Rate" required min="1" max="5" ref={rateRef} />
                    </div>
                    <div className="espace__add__input">
                        <label htmlFor="price">Prix</label>
                        <input type="text" id="price" placeholder="Prix" required  ref={priceRef} />
                    </div>
                    <div className="espace__add__input">
                        <label htmlFor="city">Ville</label>
                        <select name="ville" id="ville" ref={villeRef}>
                        {villes.map((ville) => (
                                    <option value={ville}>{ville}</option>
                        ))}
                        </select>
                    </div>
                    <div className="espace__add__input">
                        <label htmlFor="price">Type</label>
                        <select type="text" id="type" placeholder="Type" required ref={typeRef} >
                            <option value="hotel">Hôtel</option>
                            <option value="appartement">Appartement</option>
                            <option value="cafe">Cafe</option>
                            <option value="espace">Espace de travail</option>
                        </select>
                    </div>
                    <div className="espace__add__input">
                        <label htmlFor="timing">Jour/Heure</label>
                        <select type="text" id="timing" required ref={timingRef} >
                            <option value="jour">Jour</option>
                            <option value="heure">Heure</option>
                            <option value="both">les deux</option>
                        </select>
                    </div>
                    <h3>Tags</h3>
                    <div className="espace__add__input__tags">
                        <ul className="tags">
                            {tags?.map((tag, index) => (
                                <li key={index} className="tag">
                                    <span className="tag__title">{tag}</span>
                                    <span className="tag__close__button" onClick={() => removeTags(index)}>
                                        X
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <input 
                            type="text" 
                            onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
                            placeholder="Ajouter des tags"
                            id="tags"
                        />
                    </div>
                    <label htmlFor="description" className="espace__add__description__label">Description</label>
                    <textarea 
                        name="description" 
                        id="description" 
                        cols="30" rows="10" 
                        className="espace__add__description"
                        required
                        ref={descriptionRef}
                    >

                    </textarea>
                </form>
            </div>
            <div className="espace__add__rightSide">
                <div className="espace__add__rightSide__top">
                    {images?.map(image => (
                        <img src={image} alt="ProduiyImage" className="espace__add__image" />
                    ))}
                    <input 
                        type="file" 
                        hidden 
                        accept="image/*"
                        ref={fileInputRef} 
                        onChange={handleFileInput} 
                        multiple
                        name="multi-files-add"
                    />
                    <div className="espace__add__image__add" onClick={handleClick}>+</div>
                </div>
                <div className="espace__add__rightSide__bottom">
                    <p>*Vous pouvez pas ajouter plus que sept images</p>
                    <button className="espace__add__button" onClick={handleAdd}>Appliquer</button>
                </div>
            </div>
        </animated.div>
    )
}

export default EspaceAdd;
