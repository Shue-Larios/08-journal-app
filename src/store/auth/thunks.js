// import { Provider } from "react-redux";
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/provider";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
}

// funcion para autenticarme con google paso 2 ( no estoy seguro OJO)
export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        //  este llamado es a la funcion singInWithGoogle de provedir aca obtengo todo lo q stoy retornando
        const result = await singInWithGoogle();
        //    este ok viene desde Provider.js
        // si el ok es false entoncs dispara la accion de logout
        if (!result.ok) return dispatch(logout(result.errorMessage))

        // si todo sale bien
        dispatch(login(result))
    }
}

// ingresar con email y contraseña paso 1
// lo d los parentecis es lo q pienso recibir
export const startLoginWithEmailPassword = ({ email, password }) => {
    // retorna un procedimiento asincrono
    return async (dispatch) => {
        dispatch(checkingCredentials());
        // tambien mando datos dentro del parentecis
        const result = await loginWithEmailPassword({ email, password });
        //    hacemos la evaluacion
        // console.log(result);
        if (!result.ok) return dispatch(logout(result.errorMessage))
        // // si todo sale bien
        dispatch(login(result))
    }
}

// Para registrar usuario Paso 2
// aca espero los mismo datos q coloque en el paso1
export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        // mandamos a llamar registerUserWithEmailPassword y hay q importarlo tambien
        const result = await registerUserWithEmailPassword({ email, password, displayName });
   
        if (!result.ok) return dispatch(logout(result.errorMessage));
        //  si todo sale bien logeamos al usuario

        dispatch(login(result));
    }
}

// funcion para el logout paso 2
export const startLogout = () => {
    return async( dispatch ) => {
        await logoutFirebase();
        // este dispatch es para limpiar las notas
        // para limpiar las notas al cerrar sesion Paso 3
        dispatch( clearNotesLogout() );
 
        dispatch( logout() );
    }
}








