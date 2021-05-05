import React, { useEffect, useState } from 'react';
import { Calendar , momentLocalizer } from 'react-big-calendar';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import { uiOpenModal } from '../../actions/ui';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

//cambiamos el idioma del moment
moment.locale('es');

const localizer = momentLocalizer(moment); // or globalizeLocalizer

// const events = [{
//     title: 'Cumpleaños del jefe',
//     start: moment().toDate(), //new Date 
//     end: moment().add( 2 , 'hours' ).toDate(),
//     bgcolor: '#fafafa',
//     notes: 'Comprar la tarta',
//     user: {
//         _id: '123',
//         name: 'Rollo'
//     }
// }];

export const CalendarScreen = () => {

    // dispatch de la accion
    const dispatch = useDispatch();

    // TODO: leer del store, los eventos
    const { events , activeEvent } = useSelector( state => state.calendar ); // calendar es donde se guardan

    // leemos el store para el uid
    const { uid } = useSelector( state => state.auth );

    // variable para el estado
    const [ lastView , setLastView ] = useState( localStorage.getItem( 'lastView' ) || 'month' );

    // para cargar los eventos de la base de datos
    useEffect(() => {
        
        dispatch( eventStartLoading() );

    }, [dispatch]);



    // eventos para controlar: 

    const onDoubleClick = ( e ) => {    // abrir modal
        // console.log(e)
        dispatch( uiOpenModal() );  // cuando seleccionemos abra el modal 
    }

    // evento para seleccionar
    const onSelectEvent = ( e ) => {
        
        dispatch( eventSetActive( e ) ); // aqui si pide el evento en la funcion
    }

    const onViewChange = ( e ) => {
        setLastView(e); //actualizamos el ultimo estado del view
        localStorage.setItem( 'lastView' , e );
    }


    // evento para la seleccion de cualquier cuadro y crear el evento
    const onSelectSlot = ( e ) => {
        dispatch( eventClearActiveEvent() )
    }

    // evento del estilo
    const eventStyleGetter = ( event , start , end , isSelected ) => {
        
        
        // cambiar de color las notas que no son mias
        // console.log(event);

        const style = {
            backgroundColor: ( uid === event.user._id ) ?  '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    };




    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                view={ lastView }
                components={{
                    event: CalendarEvent    // se manda como referencia no como para renderizarlo
                }}
            />
            

            <AddNewFab />   

            {   /* si existe una nota activa que muestre el boton de borrar */

                ( activeEvent ) && <DeleteEventFab />

            }

            <CalendarModal />




        </div>
    )
}
