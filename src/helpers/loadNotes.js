 import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';
 
// funcion para cargar las notes del firebase paso 3
export const loadNotes = async( uid = '') => {
    if ( !uid ) throw new Error('El UID del usuario no existe');
    // collection es una funcion de firebase
    // en la url hay q apuntar exactamente a la coleccion de la pagina de firebase
    const collectionRef = collection( FirebaseDB, `${uid}/journal/notes` );
// traigo  los documentos que esa coleccion tiene
// dentro del parentecis se pueden poner condiciones xk es como un query de SQL
const docs = await getDocs(collectionRef);

        //  si yo quiero la data de cada uno de los documentos
const notes = [];
docs.forEach( doc => {
// aca tomo mis notas y al arreglo de arriba le añado el id q viene de doc.id  y los datos del arreglo que viene de doc.data()
// ...doc.data() esto significa exparcir toda la informacion que esta ahi
     notes.push({ id: doc.id, ...doc.data() });
 
});

return notes;

}



