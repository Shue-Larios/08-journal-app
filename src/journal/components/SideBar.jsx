import { AssignmentTurnedIn } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux";
import { SideBarItem } from "./";
 


export const SideBar = ({ drawerWidth = 240 }) => {
    const { displayName  } = useSelector(state => state.auth);

// para obtener las notas desde firebase paso 1
const { notes  } = useSelector(state => state.journal);

// console.log(notes);
    return (

        <Box
            component='nav'
            // La propiedad CSS flex-shrink especifica el factor de contracción de un flex item.
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} >

            {/* en material al sidebar se le conoce como Drawer */}
            <Drawer
                variant="permanent"
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }

                }}
            >
                <Toolbar>
                    <Typography
                        variant="h6" noWrap component='div'>
                            
                       {displayName}
                    </Typography>

                </Toolbar>
                <Divider />
                <List>
                    {
                        // esta parte es como las opciones
                        // el note es como voy a nombrarlo nada mas
                        notes.map(note => (
                        //   en esta parte siempre poner el key
                        // {...note}  asi estoy exparciendo toda la nota y la mando al SideBarItem
                            <SideBarItem  key={ note.id } {...note} />
                        ))
                  
                    }
                </List>
            </Drawer>
        </Box>
    )
    { console.log(note)};
}
