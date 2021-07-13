import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectEspaceEdit } from '../../../../features/espacePageSlice';
import { selectEspaces } from '../../../../features/espacesSlice';
import swal from 'sweetalert';
import axios from '../../../../axios/axios';


import './EspaceEdit.css';
import { selectUser } from '../../../../features/userSlice';

function EspaceEdit() {
    const espaces = useSelector(selectEspaces);
    const id = useSelector(selectEspaceEdit).id;
    const user = useSelector(selectUser);
    const espace = espaces.filter(espace => espace._id === id);
    const [images, setImages] = useState(espace[0].images);
    const [imagesRef, setImagesRef] = useState(null);
    const [img, setImg] = useState(null);
    const [tags, setTags] = useState(espace[0].features);
    const fileInputRef = useRef();
    const titleRef = useRef();
    const lieuRef = useRef();
    const priceRef = useRef();
    const villeRef = useRef();
    const descriptionRef = useRef();

    useEffect(() => {
        if (img) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages([...images, reader.result]);
            }

            reader.readAsDataURL(img);
        } else {
            setImages(images);
        }
    }, [img])
    
    function removeTags(indexToRemove) {
        setTags([...tags.filter((_,index) => index !== indexToRemove)]);
    }

    function addTags(event) {
        if (event.target.value !== "") {
            setTags([...tags, event.target.value]);
            event.target.value = "";
        }
    }

    function handleClick() {
        fileInputRef.current.click();
    }

    function handleFileInput(event) {
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
            swal({
                title: "Erreur",
                text: "Vous pouvez pas ajouter plus que sept images",
                icon: "error",
                button: "Ok"
            })
        }
    }

    function handleEdit() {

            const form = new FormData();
            imagesRef?.forEach((image) => {
                form.append('multi-files-update', image);
            });
    
            const timing = espace[0].timing;
            const owner_id = user.id;
            const title = titleRef.current.value ? titleRef.current.value : espace[0].title;
            const lieu = lieuRef.current.value ? lieuRef.current.value : espace[0].lieu;
            const features = tags;
            const price = priceRef.current.value ? priceRef.current.value + "DH" : espace[0].price;
            const type = espace[0].type;
            const rate = espace[0].rate;
            const ville = villeRef.current.value ? villeRef.current.value : espace[0].ville;
            const description = descriptionRef.current.value ? descriptionRef.current.value : espace[0].description;
            
            const body = JSON.stringify({
                owner_id,
                title,
                lieu,
                features,
                price,
                type,
                timing,
                rate,
                ville,
                description,
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
    
            axios.post(`/api/products/update/${id}`, body, configInfo)
                 .then((res) => {
                     if (imagesRef !== null) {
                         axios.post(`/api/products/update/image/${id}`, form, configImg)
                              .then(() => {
                                  swal({
                                    title: "Bien",
                                    text: "Le produit est bien modifié",
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
                     } else {
                         swal({
                             title: "Bien",
                             text: "Le produit est bien modifié",
                             icon: "success",
                             button: null,
                         })
                         setTimeout(() => {
                             window.location.reload(false);
                         }, 2000);
                     }
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


    return (
        <div className="espace__edit__container">
            <div className="espace__edit__leftSide">
                <form>
                    <div className="espace__edit__input">
                        <label htmlFor="title">Titre</label>
                        <input type="text" id="title" placeholder={espace[0].title} ref={titleRef} />
                    </div>
                    <div className="espace__edit__input">
                        <label htmlFor="lieu">Lieu</label>
                        <input type="text" id="lieu" placeholder={espace[0].lieu} ref={lieuRef} />
                    </div>
                    <div className="espace__edit__input">
                        <label htmlFor="price">Prix</label>
                        <input type="text" id="price" placeholder={espace[0].price} ref={priceRef} />
                    </div>
                    <div className="espace__edit__input">
                        <label htmlFor="city">Ville</label>
                        <input type="text" id="city" placeholder={espace[0].ville} ref={villeRef} />
                    </div>
                    <h3>Tags</h3>
                    <div className="espace__edit__input__tags">
                        <ul className="tags">
                            {tags.map((tag, index) => (
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
                    <label htmlFor="description" className="espace__edit__description__label">Description</label>
                    <textarea 
                        name="description" 
                        id="description" 
                        cols="30" 
                        rows="10" 
                        className="espace__edit__description"
                        ref={descriptionRef}
                    >
                        {espace[0].description}
                    </textarea>
                </form>
            </div>
            <div className="espace__edit__rightSide">
                <div className="espace__edit__rightSide__top">
                    {images.map(image => (
                        <img src={image} alt="ProduiyImage" className="espace__edit__image" />
                    ))}
                    <input 
                        type="file" 
                        hidden 
                        accept="image/*"
                        ref={fileInputRef} 
                        onChange={handleFileInput}
                        multiple
                        name="multi-files-update"
                    />
                    <div className="espace__edit__image__add" onClick={handleClick}>+</div>
                </div>
                <div className="espace__edit__rightSide__bottom">
                    <p>*Vous pouvez pas ajouter plus que sept images</p>
                    <button className="espace__edit__button" onClick={handleEdit}>Appliquer</button>
                </div>
            </div>
        </div>
    )
}

export default EspaceEdit;
