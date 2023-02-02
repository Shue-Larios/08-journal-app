import { CloudUpload, DeleteForever, SaveOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useRef } from "react";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hook/useForm";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startDeletingNote, startSaveNotes, startUploadingFiles } from "../../store/journal/thunks";
import { ImageGallery } from "../components"
// import 'sweetalert2/src/sweetalert2.scss'; con el CDN no ocupo mas  q el link en el indexss



export const NoteView = () => {

    const dispatch = useDispatch();
    // para poner la fecha del sistema en la pantalla
    // const fecha = new Date();
    // const options = { year: 'numeric', month: 'long', day: 'numeric' };
    // const dateString = fecha.toLocaleDateString("es-ES", options);


    //       para leer algo del store usamos useselector
    // en la otra parte es el nombre del principal q sale en la extencion de redux
    // dentro del parentecis va lo q quiero regresar
    //   active:notees una sintaxis para renombrar nada mas
    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal);


    //    para manejar el formulario
    const { body, title, onInputChange, formState, date } = useForm(note)

    // para la hora tambien pero en ingles esta es la que esta guardada en firebase la hora q se creo la nota
    const dateString = useMemo(() => {
        const newDate = new Date(date);

        return newDate.toUTCString();
    }, [date])

    // hacemos referencia al input tipo file oculto con el icono de upload
    // para subir imagenes al Cloudinary paso 1.5( opcional solo sino quiero el input tradicional)
    const fileInputRef = useRef()



    // para ver los cambios en la nota activa
    useEffect(() => {
        // como activa la nota y el fomrstate tiene los datos ya actualizados por eso los ponemos asi
        dispatch(setActiveNote(formState))
        // cuando cualquier propiedad del formState cambia se va a disparar
    }, [formState])

    // mostrar mensaje de actualizacion paso 1
    // useEffect para las alertas 
    useEffect(() => {
        // preguintamos si el messageSaved no viene vacio xk asi va a star cambiando
        if (messageSaved.length > 0) {
            Swal.fire(
                'Nota Actualizada',
                messageSaved,
                'success' // esto es el mensaje q sale
            )
        }
        // cuando el messageSaved cambie se va a disparar
    }, [messageSaved])


    // para actualizar la nota en firebase paso 1
    // para actualizar la nota al precionar el boton
    const onSaveNote = () => {
        dispatch(startSaveNotes());
    }

    // hacer la extraccion de un input tradicional
    // para subir imagenes al Cloudinary paso 1
    const onFileInputChange = ({ target }) => {
        console.log(target.files); // para ver las propiedades de los archivos seleccionados
        // si no seleccionamos algo el file muestra cero
        if (target.files === 0) return

        // si todo sale bien hacemos un dispatch
        dispatch(startUploadingFiles(target.files));
    }

    {/* Eliminar datos en firebase paso 1 */ }
    const onDelete = () => {
        dispatch(startDeletingNote());
    }


    return (
        <>
            <Grid
                className="animate__animated animate__fadeIn animate__faster"
                container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
                <Grid item>
                    <Typography fontSize={39} fontWeight='light' >
                        {dateString}
                    </Typography>
                </Grid>

                <Grid item>

                    <input type="file"
                        // para que deje seleccionar multiples imagenes basta con poner  multiple
                        multiple
                        ref={fileInputRef}
                        onChange={onFileInputChange}
                        style={{ display: 'none' }}
                    />

                    <IconButton
                        disabled={isSaving}
                        color="primary"
                        sx={{ padding: 2 }}
                        //    con esta linea hago referencia a otro elemento html q ocupe
                        onClick={() => fileInputRef.current.click()}
                    >
                        <CloudUpload />
                    </IconButton>





                    <Button
                        disabled={isSaving}
                        onClick={onSaveNote}
                        color="primary"
                        sx={{ padding: 2 }}
                    >
                        <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                        Guardar
                    </Button>
                </Grid>

                <Grid container>
                    <TextField
                        label='Titulo'
                        type='text'
                        variant="filled"
                        fullWidth
                        name="title"
                        value={title}
                        onChange={onInputChange}
                        placeholder="Ingrese un titulo"
                        sx={{ border: 'none' }}
                    >
                    </TextField>

                    {/* para mostrar un texto de descripcion */}
                    <TextField

                        type='text'
                        variant="filled"
                        fullWidth
                        multiline
                        name="body"
                        value={body}
                        onChange={onInputChange}
                        placeholder="¿Que sucedio el dia de hoy?"
                        minRows={5} // el tamaño
                    >
                    </TextField>
                </Grid>

                {/* boton eliminar */}

                <Grid container justifyContent='end' >
                    <Button
                        disabled={isSaving}
                        onClick={onDelete}
                        color="error"
                        sx={{ mt: 2 }}
                    >
                        <DeleteForever sx={{ fontSize: 30, mr: 1 }} />
                        Eliminar
                    </Button>
                </Grid>



                {/* Galeria de imagenes */}
                {/* en el otro archivo las mando a llamar solamente como image */}
                <ImageGallery images={note.imageUrls} />

            </Grid>


        </>
    )
}
