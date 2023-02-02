import { createSlice } from '@reduxjs/toolkit';

// esto para agregar reducer a nuestro store de redux paso 1
export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        // para evitar doble envio entre otras cosas
        isSaving: false,
        // mensaje de grabacion
        messageSaved: '',
        notes: [],
        active: null,
    },

    // los reducer no deben disparar codigo de terceros
    reducers: {
        // para hhacer un cambio y q el boton de nueva nota no se pueda usar mientras esta guardando
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        // para agregar una nueva entrada
        addNewEmptyNote: (state, action) => {
            // paso 2 para añadir nota
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        //  para activar una nota
        setActiveNote: (state, action) => {
            // paso 1 para activar nota
            // hay que activarla para poder hacer un CRUD
            state.active = action.payload;
            state.messageSaved = '';
        },
        // cargar las notas
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        // para cuandoe stoy grabando las notas
        setSaving: (state) => {
            state.isSaving = true
            //Todo: mensaje de error...   
            state.messageSaved = '';
        },
        // para subir imagenes al Cloudinary paso 4
        // agrega el url a la nota activa
        setPhotosToActiveNote: (state, action) => {
            // para mantener las imagenes anteriores despues de la como agregamos las nuevas
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
            state.isSaving = false;

        },

        // actualizar una nota
        updateNote: (state, action) => {
            // actualizar mi referencia local
            state.isSaving = false
            state.notes = state.notes.map(note => {
                if (note.id === action.payload.id) {
                    return action.payload;
                }
                return note
            });
            // mostrar mensaje de actualizacion paso 1
            state.messageSaved = `${action.payload.title}, actualizada correctamente`
        },
        // para limpiar las notas al cerrar sesion Paso 1 paso 2 en el thunks de journal
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },

        //   Eliminar datos en firebase paso 3 
        deleteNoteById: (state, action) => {
            // le digo q ya no va a star activa
            state.active = null;
            //   para tomar todas las notas y unicamente quitar o  filtrar la nota cuyo id es igual al id q recibo 
            state.notes = state.notes.filter(note => note.id !== action.payload);


        },
    }
});
export const { savingNewNote,
    clearNotesLogout,
    setPhotosToActiveNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById } = journalSlice.actions;