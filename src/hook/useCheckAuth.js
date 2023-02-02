
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { startLoadingNotes } from "../store/journal/thunks";

export const useCheckAuth = () => {

  // antes de mostrar mis rutas vamos hacer una evaluacion
  const { status } = useSelector(state => state.auth)
  const dispatch = useDispatch();


  // disparamos un efecto q cambia cuando estamos autenticados o no
  useEffect(() => {

    // una funcion de firebase cuando el estado de la autenticacion cambia
    onAuthStateChanged(FirebaseAuth, async (user) => {
      // aca decimos si no hay un usuario
      if (!user) return dispatch(logout());
      // si hay usuario y para q me salgan llenos los datos en la extencion de redux aca es donde nos damos cuenta si hay un usuario
      const { uid, email, displayName, photoURL } = user;

      dispatch(login({ uid, email, displayName, photoURL }))
      // en el cual tenemos la peticion de 
      // funcion para cargar las notes del firebase paso 2
      dispatch(startLoadingNotes());

    })
  }, [])

  return {
    status
  }


}
