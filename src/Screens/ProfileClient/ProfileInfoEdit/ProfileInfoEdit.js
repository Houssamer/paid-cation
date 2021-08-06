import React, { useEffect, useRef, useState } from 'react';
import './ProfileInfoEdit.css';
import profile from '../../../assets/pictures/profile.png';
import { useDispatch, useSelector } from 'react-redux';
import { Login, selectUser } from '../../../features/userSlice';
import axios from '../../../axios/axios';
import swal from 'sweetalert';
import { useSpring, animated } from 'react-spring'; 
import ReactLoading from 'react-loading';


function ProfileInfoEdit() {
    const user = useSelector(selectUser);
    const [img, setImg] = useState(null);
    const [preview, setPreview] = useState('');
    const [ready, setReady] = useState(true);
    const inputRef = useRef();
    const dispatch = useDispatch();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const numRef = useRef();
    const emailRef = useRef();
    const props = useSpring({
        from: {opacity: 0},
        to: {opacity: 1},
        config: {duration: 800},
    })


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
            axios.post(`/api/users/updateInfo/${user.id}`, body, configInfo)
            .then((res) => {
                dispatch(Login({
                    ...user,
                    firstName: res.firstName,
                    lastName: res.lastName,
                    email: res.email,
                    num: res.num,
                }));
                swal("Bien", res.data.message, "success");
                setTimeout(() => {
                    window.location.reload(false);
                }, 3000);
            })
            .catch((err) => {
                setReady(true);
                swal("erreur", err.response.data.message, "error");
            })
            
            axios.post(`/api/users/updateImg/${user.id}`, form, configImg) 
            .then((res) => {
                dispatch(Login({
                    ...user,
                    image: res.image,
                }));
                setReady(true);
                swal({
                    title: "Bien", 
                    text: "votre image est bien modifiée", 
                    icon: "success",
                    button: null,
                });
                setImg(null);
                setTimeout(() => {
                   window.location.reload(false);
               }, 3000);
            })
            .catch((err) => {
                setReady(true);
                swal("erreur", err.response.data.message, "error");
            })

        }
      }

    return (
        <animated.div style={props} className="information__client__container">
            {!ready && (
                <div className={`${ready ? "hiddenLoadingImg" : "LoadingImg"}`}>
                    <ReactLoading type="spin" color="black" height={'20%'} width={'20%'} />
                </div>
            )}
            <div className="information__client__topSide">
                <div className="information__client__leftSide">
                    <form>
                        <div className="information__client__info">
                            <label htmlFor="nom">Nom</label>
                            <input type="text" placeholder={user.lastName} ref={lastNameRef} id="nom" />
                        </div>
                        <div className="information__client__info">
                            <label htmlFor="prenom">Prénom</label>
                            <input type="text" placeholder={user.firstName} ref={firstNameRef} id="prenom" />
                        </div>
                        <div className="information__client__info">
                            <label htmlFor="num">Numéro de tél</label>
                            <input type="text" placeholder={user.num} ref={numRef} id="num" />
                        </div>
                        <div className="information__client__info">
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder={user.email} ref={emailRef} id="email" />
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
                <button className="information__client__editButton" onClick={handleEdit}>Appliquer</button>
            </div>
        </animated.div>
    )
}

export default ProfileInfoEdit
