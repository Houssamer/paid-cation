import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInformationEdit } from '../../../../features/espacePageSlice';
import { selectUser } from '../../../../features/userSlice';
import profile from '../../../../assets/pictures/profile.png'
import './EspaceInfo.css';
import { useSpring, animated } from 'react-spring';

function EspaceInfo() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const props = useSpring({
        from: {opacity: 0},
        to: {opacity: 1},
        config: {duration: 600},
    });

    function editInfo(event) {
        event.preventDefault();

        dispatch(setInformationEdit());
    }

    return (
        <animated.div style={props} className="information__espace__container">
            <div className="information__espace__topSide">
                <div className="information__espace__leftSide">
                    <form>
                        <div className="information__espace__info">
                            <label htmlFor="nom">Nom</label>
                            <input type="text" value={user.lastName} id="nom" />
                        </div>
                        <div className="information__espace__info">
                            <label htmlFor="prenom">Prénom</label>
                            <input type="text" value={user.firstName} id="prenom" />
                        </div>
                        <div className="information__espace__info">
                            <label htmlFor="num">Numéro de tél</label>
                            <input type="text" value={user.num} id="num" />
                        </div>
                        <div className="information__espace__info">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={user.email} id="email" />
                        </div>
                    </form>
                </div>
                <div className="information__espace__rightSide">
                    <img 
                        src={user.image ? user.image : profile} 
                        alt="profile" 
                        className="information__espace__img" 
                    />
                </div>
            </div>
            <div className="information__espace__bottomSide">
                <button className="information__espace__editButton" onClick={(event) => editInfo(event)}>
                    Modifier
                </button>
            </div>
        </animated.div>
    )
}

export default EspaceInfo;
