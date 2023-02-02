import { async } from "@firebase/util";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById } from "./journalSlice";



// esta funcion comienza el proceso
export const startNewNote = () => {
    return async (dispatch, getState) => {

        //  dispatch( savingNewNote () );


        // para grabar en firebase ocupamos el id del usuario
        // getState() nos trae todo lo q tenemos en el state mostrado en la extencion de redux y que lo busque en .auth
        // aca tomamos el uid del usuario
        const { uid } = getState().auth;

        // nueva nota en objeto
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        // la referencia al documento es el punto donde lo quiero insertar
        // doc es una funcion de firebase/firestore
        // en este punto ya sabe a q base de datos se refiere
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

        // para insertar un objeto setDoc es funcion tambien d firebase
        // pide dos cosas el documento dond lo quiero insertar y cual objeto insertar
        await setDoc(newDoc, newNote);


        // a la newNote lo unico q le falta es el id aca se lo creo este se agrega al final del newNote visible en redux
        // paso 1 para añadir nota
        newNote.id = newDoc.id;

        // hacemos el dispatch
        // paso 3 para añadir nota
        // esta funcion ocupa el payload que es newNote
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));

    }
}

// funcion para cargar las notes del firebase paso 1
export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        // aca tomamos el uid del usuario
        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe');
        // console.log({ uid });
        // el payload es este await
        const notes = await loadNotes(uid);
        // aca mando el payload
        dispatch(setNotes(notes));
    }
}

// para actualizar la nota en firebase paso 2
export const startSaveNotes = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving());
        // aca tomamos el uid del usuario
        const { uid } = getState().auth;
        // aca tomamos el id de la nota
        const { active: note } = getState().journal;
        // la nota que quiero mandar a grabar a firestore
        const noteTofireStore = { ...note };
        // para eliminar una propiedad de un objeto (no la elimina de firebase  solo no la muestra)
        delete noteTofireStore.id;

        // la referencia al documento que yo quiero actualziar
        // creamo el url exacto para llegar a la nota q interesa
        const docRef = doc(FirebaseDB, `/${uid}/journal/notes/${note.id}`);

        // la forma de impartar ya en firebase
        // merge es una simple union de los campos q no existen los agrega a firebase
        await setDoc(docRef, noteTofireStore, { merge: true })
        dispatch(updateNote(note));
    }
}

// para subir imagenes al Cloudinary paso 2
export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {

        // esto va a bloquear los botones y pondra mi app en un estado de carga por asi decirlo
        dispatch(setSaving());

        // console.log(files);
        // await fileUpload(files[0]) ;
        // para subir multiples imagenes en frecuencia
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }
        // para dispararlas

        const photosUrls = await Promise.all(fileUploadPromises);
        // photosUrls tengo el link de cada imagen x eso lo mandamos
        dispatch(setPhotosToActiveNote(photosUrls));
    }

}
//   Eliminar datos en firebase paso 2 
export const startDeletingNote = () => {

    return async (dispatch, getState) => {
        // aca tomamos el uid del usuario
        const { uid } = getState().auth;

        // aca tomamos la nota activa
        const { active: note } = getState().journal;

        //   contruimos la referencia al documento a borrar
        const docRef = doc(FirebaseDB, `/${uid}/journal/notes/${note.id}`);

        // para eliminarlo
        await deleteDoc(docRef);

        // ahora tenemos q borrarlo del store y le mando el note.id
        dispatch( deleteNoteById(note.id) )


    }

}