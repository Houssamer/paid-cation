import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEspaceAdd, setEspaceEdit } from '../../../features/espacePageSlice';
import './Espace.css';
import Product from '../../../components/Product/Product';
import empty from '../../../assets/Design/empty.png';
import plus from '../../../assets/Design/plus.png'
import { selectEspaces } from '../../../features/espacesSlice';

function Espace() {
    const dispatch = useDispatch();
    const espaces = useSelector(selectEspaces);

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
                    {espaces.map(({id, title, image, lieu, features, price, type}) => (
                        <div className="espaces__espace__produit" onClick={() => handleEdit(id)}>
                            <Product 
                                title={title} 
                                image={image} 
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
