import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { chechingErrors, startLogout } from "../../store/auth"


export const NavBar = ({ drawerWidth = 240 }) => {


    const dispatch = useDispatch()

    // funcion para el logout paso 3
    const onLogout = () => {
        // para limpiar las notas al cerrar sesion Paso 1
         dispatch( startLogout() )
    }


    return (
        // fixed para que siempre este en una posicion fija
        <AppBar position="fixed"
            sx={{
                // sm pantallas pequeñas
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` }
            }}
        >

            <Toolbar>
                {/* el boton de menu */}
                <IconButton
                    color='inherit'
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    {/* el estilo del boton */}
                    <MenuOutlined />
                </IconButton>

                {/* <Grid container direction='row' justifyContent='space-between' > */}
                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant="h6" noWrap component='div'> JournalApp </Typography>
                    <IconButton color="error" onClick={onLogout} >
                        <LogoutOutlined />                         </IconButton>

                </Grid>


            </Toolbar>
        </AppBar>
    )
}
