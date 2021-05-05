import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {

    //dispatch de la accion de starLogin
    const dispatch = useDispatch();

    // uso del customhook del formulario para LOGIN 
    const [ formLoginValues, handleLoginInputChange ] = useForm({
        lEmail: 'joseluis@gmail.com',
        lPassword: '123456'
    });

    const { lEmail , lPassword } = formLoginValues;

    // uso del customhook del formulario para REGISTER 
    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        rName: 'Laura',
        rEmail: 'laura@gmail.com',
        rPassword1: '123456',
        rPassword2: '123456'
    });

    const { rName ,rEmail , rPassword1 , rPassword2 } = formRegisterValues;

    // envio del formulario de login 
    const handleLogin = ( e ) => {
        e.preventDefault();
        // console.log( formLoginValues );

        dispatch( startLogin( lEmail ,lPassword ) );
    } 

    // envio del formulario de registro 
    const handleRegister = ( e ) => {
        e.preventDefault();
        // console.log( formLoginValues );

        if ( rPassword1 !== rPassword2 ){
            return Swal.fire('Error', 'Las contraseñas deben de ser iguales' , 'error');
        }

        dispatch( startRegister( rEmail , rPassword1 , rName ) );
    }


    


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={ lEmail }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={ lPassword }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                value={ rName }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="rEmail"
                                value={ rEmail }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="rPassword1"
                                value={ rPassword1 }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="rPassword2"
                                value={ rPassword2 }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}