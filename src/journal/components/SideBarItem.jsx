import { AssignmentTurnedIn } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/journal/journalSlice"

//  lo que stoy recibiendo
export const SideBarItem = ({ title, id, body, date, imageUrls = [] }) => {

    const dispatch = useDispatch();

    // para el titulo dejarlo con maximo de 17 caracteres y si se pasa ponerle puntos
    const newTitle = useMemo(() => {
        return title.length > 14
            // le concateno un par de puntos
            ? title.substring(0, 14) + '...'
            : title;
    }, [title])

    // si es funcion de dar clic probar tambien con funcion de flecha
    const onClickNote = () => {
        dispatch(setActiveNote({ title, id, body, date, imageUrls}));
    }


    return (
        // disablePadding es como ponerle el Padding en cero
        <ListItem disablePadding>
            {/* esto es para q podamos hacer clic en la opcion */}
            <ListItemButton onClick={onClickNote} >
                <ListItemIcon>
                    {/* el estilo del icono de material ui */}
                    <AssignmentTurnedIn />
                </ListItemIcon>
                <Grid container>
                    {/* este es como el tema */}
                    <ListItemText primary={newTitle} />
                    {/* y este es el texto como descripcion */}
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
