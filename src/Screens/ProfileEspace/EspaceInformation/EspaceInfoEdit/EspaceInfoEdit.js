import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Login, selectUser } from '../../../../features/userSlice';
import profile from '../../../../assets/pictures/profile.png';
import './EspaceInfoEdit.css';
import swal from 'sweetalert';
import axios from '../../../../axios/axios';
import { useSpring, animated } from 'react-spring';
import ReactLoading from 'react-loading';



function EspaceInfoEdit() {
    const user = useSelector(selectUser);
    const [img, setImg] = useState(null);
    const [preview, setPreview] = useState('');
    const inputRef = useRef();
    const dispatch = useDispatch();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const [ready, setReady] = useState(true);
    const numRef = useRef();
    const emailRef = useRef();
    const props = useSpring({
        from: {opacity: 0},
        to: {opacity: 1},
        config: {duration: 600},
    });

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

    function handleEdit() {
        setReady(false);
        const form = new FormData();
        form.append('uploads', img);
        const firstName = firstNameRef.current.value ? firstNameRef.current.value : user.firstName;
        const lastName = lastNameRef.current.value ? lastNameRef.current.value : user.lastName;
        const num = numRef.current.value ? numRef.current.value : user.num;
        const email = emailRef.current.value ? emailRef.current.value : user.email;

        const body = JSON.stringify({
            firstName,
            lastName,
            num,
            email,
        })

        const configImg = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-auth-token': localStorage.getItem('token'),
            },
        };

        const configInfo = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token'),
            },
        };
        if (img === null) {
            axios.post(`/api/users/updateInfo/${user.id}`, body, configInfo)
                 .then((res) => {
                     dispatch(Login({
                         ...user,
                         firstName: res.firstName,
                         lastName: res.lastName,
                         email: res.email,
                         num: res.num,
                     }));
                     setReady(true);
                     swal({
                         title: "Bien", 
                         text: res.data.message,
                         icon: "success",
                         button: null,
                        });
                     setTimeout(() => {
                         window.location.reload(false);
                     }, 2000);
                 })
                 .catch((err) => {
                     setReady(true);
                     swal("erreur", err.response.data.message, "error");
                 })
        } else {
            axios.post(`/api/users/updateImg/${user.id}`, form, configImg) 
            .then((res) => {
                dispatch(Login({
                    ...user,
                    image: res.image,
                }));
                swal({
                    title: "Bien", 
                    text: "votre image est bien modifi??e", 
                    icon: "success",
                    button: null,
                });
                setImg(null);
                setTimeout(() => {
                   window.location.reload(false);
               }, 3000);
            })
            .catch((err) => {
                setReady(true)
                swal("erreur", err.response.data.message, "error");
            })

            axios.post(`/api/users/updateInfo/${user.id}`, body, configInfo)
            .then((res) => {
                dispatch(Login({
                    ...user,
                    firstName: res.firstName,
                    lastName: res.lastName,
                    email: res.email,
                    num: res.num,
                }));
                setReady(true);
                swal("Bien", res.data.message, "success");
                setTimeout(() => {
                    window.location.reload(false);
                }, 3000);
            })
            .catch((err) => {
                setReady(true)
                swal("erreur", err.response.data.message, "error");
            })
        }
      }

    return (
        <animated.div style={props} className="information__espace__container">
            {!ready && (
                <div className={`${ready ? "hiddenLoadingImg" : "LoadingImg"}`}>
                    <ReactLoading type="spin" color="black" height={'20%'} width={'20%'} />
                </div>
            )}
            <div className="information__espace__topSide">
                <div className="information__espace__leftSide">
                    <form>
                        <div className="information__espace__info">
                            <label htmlFor="nom">Nom</label>
                            <input type="text" placeholder={user.lastName} ref={lastNameRef} id="nom" />
                        </div>
                        <div className="information__espace__info">
                            <label htmlFor="prenom">Pr??nom</label>
                            <input type="text" placeholder={user.firstName} ref={firstNameRef} id="prenom" />
                        </div>
                        <div className="information__espace__info">
                            <label htmlFor="num">Num??ro de t??l</label>
                            <input type="text" placeholder={user.num} ref={numRef} id="num" />
                        </div>
                        <div className="information__espace__info">
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder={user.email} ref={emailRef} id="email" />
                        </div>
                    </form>
                </div>
                <div className="information__espace__rightSide">
                    <img 
                        src={user.image ? user.image : preview ? preview : profile} 
                        alt="profile" 
                        className="information__espace__img" 
                    />
                    <form>
                        <input 
                            type="file" 
                            accept="image/*"
                            hidden
                            ref={inputRef}
                            onChange={handleFile}
                        />
                        <button className="information__espace__editImage" onClick={handleClick}>Modifier l'image</button>
                    </form>
                </div>
            </div>
            <div className="information__espace__bottomSide">
                <button className="information__espace__editButton" onClick={handleEdit}>Appliquer</button>
            </div>
        </animated.div>
    )
}

export default EspaceInfoEdit;
