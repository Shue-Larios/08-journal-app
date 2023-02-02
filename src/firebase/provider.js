// este archivo tiene todos los proveedores de autenticacion
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "./config";


// creamos una nueva instancia de esta funcion
const googleProvider = new GoogleAuthProvider();

// funcion para autenticarme con google paso 1
export const singInWithGoogle = async () => {

    // como esta autenticacion puede fallar usamos try

    try {
        // el primero es el auth, el otro es el proveedor para q aparezca el pop
        // ya aca obtengo toda la informacion
        // signInWithPopup es una funcion de firebase
        const result = await signInWithPopup(FirebaseAuth, googleProvider)
        // informacion q quiero del usuario
        const { displayName, email, photoURL, uid } = result.user;

        return {
            // esto quiere decir q todo salio bien en esta funcion
            ok: true,
            // aca retorno la informacion del usuario
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error) {
        //    si sucede un error
        const errorCode = error.code;
        const errorMessage = errorMessage;
        console.log(errorCode);
        console.log(errorMessage);

        return {
            ok: false,
            errorMessage,
            errorCode
        }
    }
}


// ingresar con email y contraseña paso 2
// recibimos los datos dentro del parentecis
export const loginWithEmailPassword = async ({ email, password }) => {
    // como es una tarea q puede fallar siempre usamos trycatch
    try {
        // el primero es el auth, el otro es lo q estoy recibiendo
        // ya aca obtengo toda la informacion 
        // signInWithEmailAndPassword es una propiedad de firebase
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        // esto es lo q stoy sacando
        const { uid, photoURL, displayName } = resp.user;
        return {
            ok: true,
            uid, photoURL, displayName
        }

    } catch (error) {
        //    si sucede un error 
            return { ok: false, errorMessage: error.message }
    }
}

 
// funcion para autenticar con correo y password
// estos son los q estoy recibiendo 
// Para registrar usuario Paso 1 otro paso en thunks

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {

    // como es una tarea q puede fallar siempre usamos trycatch
    try {
        // createUserWithEmailAndPassword es una funcion de firebase q hay q importar
        // FirebaseAuth es funcion de firebase ya tiene toda la informacion de la autenticacion tambien le pido el email y password
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;

       

        //Todo: actualizar el displayName en firebase paso 1
        // updateProfile una funcion de firebase q hay q importar
        // dentro d el esta el usuario recien logeado { dentro de aca va lo q nosotros queremos actualizar d ese usuario en este ejemplo solo el nombre}
        await updateProfile(FirebaseAuth.currentUser, { displayName });

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        // si algo sale mal
        // console.log(error);
        return { ok: false, errorMessage: error.message }
    }

}

// funcion para el logout paso 1
export const logoutFirebase = async () => {
// esta funcion cierra todo de cualquier proveedor
    return await FirebaseAuth.signOut();
}

