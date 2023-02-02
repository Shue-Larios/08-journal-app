import { Box, Toolbar } from "@mui/material"
import { NavBar, SideBar } from "../components";

// para q la barra lateral tenga un mañano especifico
const drawerWidth = 240;

export const JournalLayout = ( {children} ) => {
    return (
        // un box lo podriamos ver com un div
        <Box sx={{ display: 'flex' }}
    className="animate__animated animate__fadeIn animate__faster"
        
        >

            {/* Navbar */}
            {/* importamos nuestro navbar */}
            <NavBar drawerWidth={drawerWidth} />
            {/* Sidebar */}
            <SideBar drawerWidth={drawerWidth} />
            <Box
                component='main'
                // La propiedad flex-grow de CSS especifica el factor de crecimiento de un elemento flexible (que tiene asignado display:flex)
                sx={{ flexGrow: 1, p: 3 }}
            >
                {/* Toobar */}
                <Toolbar />
                {children}

              
            </Box>


        </Box>
    )
}
