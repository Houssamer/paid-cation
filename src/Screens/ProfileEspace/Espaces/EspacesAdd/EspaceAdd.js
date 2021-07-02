import React, { useEffect, useRef, useState } from 'react';
import './EspaceAdd.css';

function EspaceAdd() {
    const [images, setImages] = useState();
    const [img, setImg] = useState(null);
    const [tags, setTags] = useState(null);
    const fileInputRef = useRef();

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
            } else {
                setImg(null);
            }
         } else {
             if (images.length < 7) {
                 const file = event.target.files[0];
                 if (file && file.type.substring(0,5) === "image") {
                     setImg(file);
                 } else {
                     setImg(null);
                 }
             } else {
                 alert("Vous pouvez pas ajouter plus que sept images")
             }
         }
         }


    return (
        <div className="espace__add__container">
            <div className="espace__add__leftSide">
                <form>
                    <div className="espace__add__input">
                        <label htmlFor="title">Titre</label>
                        <input type="text" id="title" placeholder="titre" />
                    </div>
                    <div className="espace__add__input">
                        <label htmlFor="lieu">Lieu</label>
                        <input type="text" id="lieu" placeholder="Lieu" />
                    </div>
                    <div className="espace__add__input">
                        <label htmlFor="price">Prix</label>
                        <input type="text" id="price" placeholder="Prix" />
                    </div>
                    <div className="espace__add__input">
                        <label htmlFor="city">Ville</label>
                        <input type="text" id="city" placeholder="Ville" />
                    </div>
                    <div className="espace__add__input">
                        <label htmlFor="price">Type</label>
                        <select type="text" id="type" placeholder="Type">
                            <option value="hotel">Hôtel</option>
                            <option value="appartement">Appartement</option>
                            <option value="cafe">Cafe</option>
                            <option value="espace">Espace de travail</option>
                        </select>
                    </div>
                    <div className="espace__add__input">
                        <label htmlFor="timing">Jour/Heure</label>
                        <select type="text" id="timing">
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
                    />
                    <div className="espace__add__image__add" onClick={handleClick}>+</div>
                </div>
                <div className="espace__add__rightSide__bottom">
                    <p>*Vous pouvez pas ajouter plus que sept images</p>
                    <button className="espace__add__button">Appliquer</button>
                </div>
            </div>
        </div>
    )
}

export default EspaceAdd;
