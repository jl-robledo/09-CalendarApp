import React from 'react'

export const CalendarEvent = ( { event } ) => {

    // desestructuramos para extraer lo que necesitamos usar
    const { title , user } = event;

    return (
        <div>
            <strong> { title } </strong>
            <span>- { user.name } </span>
        </div>
    )
}
