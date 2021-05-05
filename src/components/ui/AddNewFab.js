

import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../actions/ui';

export const AddNewFab = () => {

    // para poder usar el boton hay que hacer el dispatch de la accion
    const dispatch = useDispatch();

    // creamos el evento del click para el boton de añadir cita
    const handleClickNew = () => {
        dispatch( uiOpenModal() );
    }



    return (
        <div>
            <button
                className="btn- btn-primary fab"
                onClick={ handleClickNew }
            >

                <i className="fas fa-plus"></i>

            </button>
        </div>
    )
}
