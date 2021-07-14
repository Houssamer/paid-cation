import React from 'react';
import './ProfileInformation.css';
import profile from '../../../assets/pictures/profile.png';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';
import { setInformationEdit } from '../../../features/pageSlice';
import { useSpring, animated} from 'react-spring';

function ProfileInformation() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const props = useSpring({
        from: {opacity: 0},
        to: {opacity: 1},
        config: {duration: 800},
    });


    function editInfo(event) {
        event.preventDefault();

        dispatch(setInformationEdit());
    }

    return (
        <animated.div style={props} className="information__client__container">
            <div className="information__client__topSide">
                <div className="information__client__leftSide">
                    <form>
                        <div className="information__client__info">
                            <label htmlFor="nom">Nom</label>
                            <input type="text" value={user.lastName} id="nom" />
                        </div>
                        <div className="information__client__info">
                            <label htmlFor="prenom">Prénom</label>
                            <input type="text" value={user.firstName} id="prenom" />
                        </div>
                        <div className="information__client__info">
                            <label htmlFor="num">Numéro de tél</label>
                            <input type="text" value={user.num} id="num" />
                        </div>
                        <div className="information__client__info">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={user.email} id="email" />
                        </div>
                    </form>
                </div>
                <div className="information__client__rightSide">
                    <img 
                        src={user.image ? user.image : profile} 
                        alt="profile" 
                        className="information__client__img" 
                    />
                </div>
            </div>
            <div className="information__client__bottomSide">
                <button className="information__client__editButton" onClick={(event) => editInfo(event)}>
                    Modifier
                </button>
            </div>
        </animated.div>
    )
}

export default ProfileInformation
