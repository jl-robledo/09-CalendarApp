import { combineReducers } from 'redux';

import { uiReducer } from './uiReducer';
import { calendarReducer } from './calendarReducer';
import { authReducer } from './authReducer';


// combinacion de los reducers, auteticacion, calendario y ui

export const rootReducer = combineReducers({ // objeto como va a ser el store

    ui: uiReducer,
    calendar: calendarReducer,   // TODO: CalendarReducer
    auth: authReducer   // TODO: AuthReducer
    
})