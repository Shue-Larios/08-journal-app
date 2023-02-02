import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { journalSlice } from './journal';


export const store = configureStore({
  reducer: {
// esto para agregar reducer a nuestro store de redux paso 2
    // para utilizar nuestro Slice
    // es el nombre de como lo voy a identificar
    auth: authSlice.reducer,
    journal: journalSlice.reducer,
  },

});

