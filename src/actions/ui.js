import { types } from "../types/types";



// abrir el modal para abrir el evento y modificarlo
export const uiOpenModal = () => ({
    type: types.uiOpenModal     
});

// cerrar el modal cuando pinchemos fuera del mismo
export const uiCloseModal = () => ({
    type: types.uiCloseModal
});