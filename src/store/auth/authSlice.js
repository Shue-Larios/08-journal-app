import { createSlice } from '@reduxjs/toolkit';

// esto para agregar reducer a nuestro store de redux paso 1
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'not-authenticated', 'authenticated', checking
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
    },
    reducers: {
        // para saber si esta autenticado
        login: (state, { payload }) => {
            state.status = 'authenticated', // 'not-authenticated', 'authenticated', checking
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
        },

        // cuando no esta autenticado
        logout: (state, { payload }) => {
            state.status = 'not-authenticated', // 'not-authenticated', 'authenticated', checking
                state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload;
        },
        // para star verificando si esta autenticado o no
        // este me va a servir para bloquear botones evitar doble posteo de submit  
        checkingCredentials: (state) => {
            state.status = 'checking'
        },
        // para iniciar los msj de alerta
        chechingErrors: (state) => {
            state.errorMessage = null;
        },
    }
});
export const { login, logout, checkingCredentials, chechingErrors } = authSlice.actions;