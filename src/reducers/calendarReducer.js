
import { types } from '../types/types';


// {
//     id: new Date().getTime(),        // viene de la base de datos
//     title: 'Cumpleaños del jefe',
//     start: moment().toDate(), //new Date 
//     end: moment().add( 2 , 'hours' ).toDate(),
//     notes: 'Comprar la tarta',
//     user: {
//         _id: '123',
//         name: 'Rollo'
//     }
// }

const initialState = {
        events: [],
        activeEvent: null

};

export const calendarReducer = ( state = initialState , action ) => {

    switch ( action.type ) {
        case types.eventSetActive:  // activar la nota 
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.eventAddNew: // añadir una nota
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }

        case types.eventClearActiveEvent:   // limpiar la nota activa
            return {
                ...state,
                activeEvent: null
            }

        case types.eventUpdated:    // actualizar un evento
            return {
                ...state,
                events: state.events.map(   // hacemos un map para buscar el evento que queremos
                    e => ( e.id === action.payload.id ) ? action.payload : e // condicion
                ),       
                activeEvent: null   // desactivamos la nota 
            }

        case types.eventDeleted:        // borrar la nota activa
            return {
                ...state,
                events: state.events.filter(   // hacemos un filter para buscar el evento que queremos
                    e => ( e.id !== state.activeEvent.id )   // condicion
                ),
                activeEvent: null
            }

        case types.eventLoaded:
            return {
                ...state,
                events: [ ...action.payload ]
            }

        case types.eventLogout:
            return {
                ...initialState
            }
    
        default:
            return state;
    }
}