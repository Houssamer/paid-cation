import React, { useEffect, useRef, useState } from 'react';
import './ProfileInfoEdit.css';
import profile from '../../../assets/pictures/profile.png';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';

function ProfileInfoEdit() {
    const user = useSelector(selectUser);
    const [img, setImg] = useState(null);
    const [preview, setPreview] = useState('');
    const inputRef = useRef();

    useEffect(() => {
        if (img) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            }

            reader.readAsDataURL(img);
        } else {
            setPreview('');
        }
    }, [img])
    
    function handleFile(event) {
        const file = event.target.files[0];
        if (file && file.type.substring(0,5) === "image") {
          setImg(file);
        } else {
            setImg(null);
        }
      }
    
      function handleClick(event) {
        event.preventDefault();
        inputRef.current.click();
      }

    return (
        <div className="information__client__container">
            <div className="information__client__topSide">
                <div className="information__client__leftSide">
                    <form>
                        <div className="information__client__info">
                            <label htmlFor="nom">Nom</label>
                            <input type="text" placeholder={user.lastName} id="nom" />
                        </div>
                        <div className="information__client__info">
                            <label htmlFor="prenom">Prénom</label>
                            <input type="text" placeholder={user.firstName} id="prenom" />
                        </div>
                        <div className="information__client__info">
                            <label htmlFor="num">Numéro de tél</label>
                            <input type="text" placeholder={user.num} id="num" />
                        </div>
                        <div className="information__client__info">
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder={user.email} id="email" />
                        </div>
                    </form>
                </div>
                <div className="information__client__rightSide">
                    <img 
                        src={user.image ? user.image : preview ? preview : profile} 
                        alt="profile" 
                        className="information__client__img" 
                    />
                    <form>
                        <input 
                            type="file" 
                            accept="image/*"
                            hidden
                            ref={inputRef}
                            onChange={handleFile}
                        />
                        <button className="information__client__editImage" onClick={handleClick}>Modifier l'image</button>
                    </form>
                </div>
            </div>
            <div className="information__client__bottomSide">
                <button className="information__client__editButton">Appliquer</button>
            </div>
        </div>
    )
}

export default ProfileInfoEdit
