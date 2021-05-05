import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';


import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../actions/events';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');

// inicio del value para la fecha le añadimos la configuracion para la hora que nos convenga
const now = moment().minutes(0).seconds(0).add(1,'hours'); // hora+1:00:00
const nowPlus1 = now.clone().add( 1, 'hours' );    // creamos un clon para establecer la hora final


// para controlar el formulario
const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
}



export const CalendarModal = () => {

    // para controlar el store y la colocamos en el <Modal isOpen={ modalOpen } ..../>
    const { modalOpen } = useSelector( state => state.ui );
    const { activeEvent } = useSelector( state => state.calendar ); // para controlar el activeEvent y cargar la info
    const dispatch = useDispatch();


    // para controlar el cambio de la fecha
    const [ dateStart, setDateStart ] = useState( now.toDate() );
    const [ dateEnd, setDateEnd ] = useState( nowPlus1.toDate() ); 

    //estado para la validacion de la caja de text
    const [ titleValid, setTitleValid ] = useState(true);

    // para controlar el formulario 
    const [formValues, setFormValues] = useState( initEvent );

    const { title , notes , start, end } = formValues;

    // evento para cargar la informacion cuando se seleccione una cita
    // hay que estar pendiente del activeEvent
    useEffect(() => {
        // console.log(activeEvent)    // comprobamos lo que hay dentro
        // para que no nos de fallo con la primera carga siendo null
        if ( activeEvent ) {    // si existe los ponemos en el formulario

            setFormValues( activeEvent );   // si no es null los valores del formulario
        } else {

            setFormValues( initEvent ); // si activeEvent esta en null se setea con el initEvent
        }

    }, [ activeEvent , setFormValues ]) // como lo necesitamos se pone en dependencias


    const handleInputChange = ({ target }) => { // controlar los cambios en el formulario
        setFormValues({
            ...formValues,
            [ target.name ]: target.value
        });
    }


    // para cerrar el modal 
    const closeModal = () => {
        // TODO: cerrar le modal
        dispatch( uiCloseModal() );
        // limpiar evento activo
        dispatch( eventClearActiveEvent() );
        //restablecemos el formulario
        setFormValues( initEvent );
    }

    const handleStartDateChange = (e) => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        })
    }

    // para guardar la informacion 
    const handleSubmitForm = (e) => {
        e.preventDefault();
        // console.log( formValues );

        //validacion de las fechas
        const momentStart = moment( start );
        const momentEnd = moment( end );

        if ( momentStart.isSameOrAfter( momentEnd ) ) {
            // mensaje de error con el sweetalert2
            return Swal.fire('Error' , 'La fecha de fin debe de ser mayor a la de inicio.' , 'error');
        }

        // validacion de la caja de texto
        if ( title.trim().length < 2 ) {    // lo hacemos de otra manera diferente al sweetalert2
            return setTitleValid( false );
        }

        // TODO: realizar la grabacion en base de datos
        // console.log(formValues);
        // hacemos un condicional para actualizar la nota en la misma funcion de crearla para guardarla
        if ( activeEvent ) { //actualizar

            dispatch( eventStartUpdate( formValues ) ) // le mandamos el nuevo evento, lo que esta en el formValues
        
        } else { // crear una nueva
            
            dispatch( eventStartAddNew( formValues ) );// lanzamos la funcion y generamos un id temporal para probarla
        
        }

        setTitleValid( true );  // cambiar el setTitleValid
        closeModal();

    }

    

    return (
        <Modal
            isOpen={ modalOpen }
            onRequestClose={ closeModal }
            style={customStyles}
            closeTimeoutMS={ 200 }
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1> { /* si el activeEvent existe -> Editando en caso contrario nueva */
                    (activeEvent) ? 'Editar evento' : 'Nuevo evento'
                 } 
            </h1> 
            <hr />
            <form 
                className="container"
                onSubmit={ handleSubmitForm }
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange } // cambio de la fecha de inicio
                        value={ dateStart }
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={ handleEndDateChange } // cambio de la fecha de inicio
                        value={ dateEnd }
                        minDate={ dateStart } // para que la fecha de fin no sea inferior a la de inicio
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={ `form-control ${ !titleValid && 'is-invalid' }` }
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ title }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
