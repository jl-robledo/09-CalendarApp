import Swal from 'sweetalert2';

import { fetchConToken } from '../helpers/fetch';
import { prepareEvents } from '../helpers/prepareEvents';
import { types } from '../types/types';


// acciones para event 

// evento para crear
export const eventStartAddNew = ( event ) => {
    return async( dispatch , getState ) => {
        // console.log(event)

        const { uid , name } = getState().auth;

        try {
            
            const resp = await fetchConToken( 'events' , event , 'POST' );
            const body = await resp.json();

            if ( body.ok ){
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name: name
                }

                console.log(event);
                dispatch( eventAddNew( event ) );
            }
            
        } catch (error) {
            console.log(error);
        }

    }
}

// no la exporto porque la uso en este mismo archivo
const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});


// evento para establecer el active
export const eventSetActive = (event) => ({  //pasarle el evento
    type: types.eventSetActive,
    payload: event
});


// limpiar nota activa 
export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent,
});


// para guardar datos en base de datos

// modificar los eventos
export const eventStartUpdate = ( event ) => {
    return async (dispatch) => {

        try {
            // console.log(event)
            const resp = await fetchConToken(`events/${ event.id }` , event , 'PUT' );
            const body = await resp.json();

            if ( body.ok ){
                dispatch( eventUpdated( event ) );
            } else {
                Swal.fire('Error' , body.msg , 'error');
            }
            
        } catch (error) {
            console.log(error);
        }
    }
}

const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
});

// borrar nota activa 
export const eventStartDelete = () => {
    return async (dispatch , getState) => {

        const { id } = getState().calendar.activeEvent;
        // console.log(id)

        try {
            // console.log(event)
            const resp = await fetchConToken(`events/${ id }` , {} , 'DELETE' );
            const body = await resp.json();

            if ( body.ok ){
                dispatch( eventDeleted() );
            } else {
                Swal.fire('Error' , body.msg , 'error');
            }
            
        } catch (error) {
            console.log(error);
        }
    }
}

const eventDeleted = () => ({
    type: types.eventDeleted,
});


//mostrar las notas guardadas en la base de datos
export const eventStartLoading = () => {
    return async ( dispatch ) => {
        // console.log('???')

        try {

            const resp = await fetchConToken( 'events' );
            const body = await resp.json();

            const events = prepareEvents( body.eventos );
            // console.log(body);
            // console.log(events)
            dispatch( eventLoaded( events ) );
            
        } catch (error) {
            console.log(error);
        }

    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
});



// eliminar la nota activa despues del Logout
export const eventLogout = () => ({
    type: types.eventLogout
});
