import React from 'react';
import PropTypes from 'prop-types';
import { Route , Redirect } from 'react-router'

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest // el resto de los componentes

}) => {

    return (
        <Route { ... rest }
            component={ (props) => (
                ( isAuthenticated ) 
                    ? <Redirect to="/" />
                    : ( <Component { ...props } /> )
            )}
        />
    )
}


PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
