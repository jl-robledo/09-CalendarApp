import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";
import { eventLogout } from "./events";


export const startLogin = ( email , password ) => {
    return async ( dispatch ) => {
        
        // console.log(email, password);

        const resp = await fetchSinToken( 'auth' , { email , password } , 'POST' );
        const body = await resp.json();

        if ( body.ok ) {
            localStorage.setItem( 'token' , body.token );
            localStorage.setItem( 'token-init-date' , new Date().getTime() );
            
            dispatch( login({ 
                uid: body.uid,
                name: body.name
            }) )
        
        } else {
            Swal.fire( 'Error' , body.msg , 'error' );
        }
        
    }
}


export const startRegister = ( email , password , name  ) => {
    return async ( dispatch ) => {

        // console.log(email, password);

        const resp = await fetchSinToken( 'auth/new' , { email , password , name } , 'POST' );
        const body = await resp.json();

        if ( body.ok ) {
            localStorage.setItem( 'token' , body.token );
            localStorage.setItem( 'token-init-date' , new Date().getTime() );
            
            dispatch( login({ 
                uid: body.uid,
                name: body.name
            }) )
        
        } else {
            Swal.fire( 'Error' , body.msg , 'error' );
        }
        

    }
}


// mantener el estado de la autenticacion
export const startCheking = () => {
    return async ( dispatch ) => {
        const resp = await fetchConToken( 'auth/renew' ); // no necesita nada o
        const body = await resp.json();

        // console.log(body)

        if ( body.ok ) {
            localStorage.setItem( 'token' , body.token );
            localStorage.setItem( 'token-init-date' , new Date().getTime() );
            
            dispatch( login({ 
                uid: body.uid,
                name: body.name
            }) )
        
        } else {
            // Swal.fire( 'Error' , body.msg , 'error' );
            dispatch( checkingFinish() );
        }
    }
}

const checkingFinish = () => ({
    type: types.authCheckingFinish
});


const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});


// para deslogarte SALIR
export const startLogout = () => {
    return ( dispatch ) => {

        localStorage.clear();   // limpiamos el localStorage
        dispatch( eventLogout() ); // desactivar la nota activa
        dispatch( logout() );
    }
}

const logout = () => ({
    type: types.authLogout
});