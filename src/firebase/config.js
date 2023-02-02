// Importa las funciones que necesitas de los SDK que necesitas
import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth'; // linea para tomar la parte de la autenticacion


import { getFirestore } from 'firebase/firestore/lite'; // para la base de datos


// TODO: agregar SDK para los productos de Firebase que desea usar
// https://firebase.google.com/docs/web/setup#available-libraries

 

// La configuración de Firebase de tu aplicación web
const firebaseConfig = {
  apiKey: "AIzaSyA874MlbJIuzPzkrBXF8zjFDblV9kKrFNs",
  authDomain: "react-cursos-f15e4.firebaseapp.com",
  projectId: "react-cursos-f15e4",
  storageBucket: "react-cursos-f15e4.appspot.com",
  messagingSenderId: "138792645111",
  appId: "1:138792645111:web:60455fd2c105a60a873ef2"
};

// Inicializar  Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

// la parte de la autenticacion nosotos la vamos a tener mediante getAuth
export const FirebaseAuth = getAuth( FirebaseApp );

// para la base de datos
export const FirebaseDB = getFirestore( FirebaseApp );
