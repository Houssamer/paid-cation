import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEspaceAdd, setEspaceEdit } from '../../../features/espacePageSlice';
import './Espace.css';
import Product from '../../../components/Product/Product';
import empty from '../../../assets/Design/empty.png';
import plus from '../../../assets/Design/plus.png'
import { selectEspaces, setEspaces } from '../../../features/espacesSlice';
import axios from '../../../axios/axios';
import { selectUser } from '../../../features/userSlice';

function Espace() {
    const dispatch = useDispatch();
    const espaces = useSelector(selectEspaces);
    const user = useSelector(selectUser);
 

    useEffect(() => {
        axios.get(`/api/products/owner/${user.id}`)
             .then((res) => dispatch(setEspaces(res.data)))
             .catch((err) => console.log(err));
    });

   

    function handleEdit(id) {
        dispatch(setEspaceEdit(id));
    }

    function handleAdd() {
        dispatch(setEspaceAdd());
    }

    return (
        <div className={`${espaces ? `espaces__espace__container` : `espaces__espace__empty__container`}`}>
            {
                espaces
                ? 
                <>
                    {espaces.map(({_id, title, images, lieu, features, price, type}) => (
                        <div key={_id} className="espaces__espace__produit" onClick={() => handleEdit(_id)}>
                            <Product 
                                title={title} 
                                image={images[0]} 
                                lieu={lieu} 
                                features={features} 
                                price={price} 
                                type={type}  
                            />
                        </div>
                    ))}
                    <div className="espaces__espace__add" onClick={handleAdd}>
                        <img src={plus} alt="plus" className="espaces__espace__add__img" />
                    </div>
                </>
                : (
                    <div className="espaces__espace__empty">
                        <img src={empty} alt="empty" className="espaces__espace__empty__img" />
                        <button className="espaces__espace__empty__button" onClick={handleAdd}>Ajouter</button>
                    </div>
                )
                
            }
        </div>
    )
}

export default Espace;
