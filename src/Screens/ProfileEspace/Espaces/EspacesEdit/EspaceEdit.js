import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectEspaceEdit } from '../../../../features/espacePageSlice';
import { selectEspaces } from '../../../../features/espacesSlice';
import './EspaceEdit.css';

function EspaceEdit() {
    const espaces = useSelector(selectEspaces);
    const id = useSelector(selectEspaceEdit).id;
    const espace = espaces.filter(espace => espace.id === id);
    const [images, setImages] = useState(espace[0].images);
    const [img, setImg] = useState(null);
    const [tags, setTags] = useState(espace[0].features);
    const fileInputRef = useRef();

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
            } else {
                setImg(null);
            }
        } else {
            alert("Vous pouvez pas ajouter plus que sept images")
        }
    }


    return (
        <div className="espace__edit__container">
            <div className="espace__edit__leftSide">
                <form>
                    <div className="espace__edit__input">
                        <label htmlFor="title">Titre</label>
                        <input type="text" id="title" placeholder={espace[0].title} />
                    </div>
                    <div className="espace__edit__input">
                        <label htmlFor="lieu">Lieu</label>
                        <input type="text" id="lieu" placeholder={espace[0].lieu} />
                    </div>
                    <div className="espace__edit__input">
                        <label htmlFor="price">Prix</label>
                        <input type="text" id="price" placeholder={espace[0].price} />
                    </div>
                    <div className="espace__edit__input">
                        <label htmlFor="city">Ville</label>
                        <input type="text" id="city" placeholder={espace[0].ville} />
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
                    />
                    <div className="espace__edit__image__add" onClick={handleClick}>+</div>
                </div>
                <div className="espace__edit__rightSide__bottom">
                    <p>*Vous pouvez pas ajouter plus que sept images</p>
                    <button className="espace__edit__button">Appliquer</button>
                </div>
            </div>
        </div>
    )
}

export default EspaceEdit;
