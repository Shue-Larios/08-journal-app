// creamos un theme para ponerlo en el Apptheme
import { createTheme } from "@mui/material";
// para mostrar errores en pantalla
import { red } from "@mui/material/colors";

export const purpleTheme = createTheme({
    palette: {
        // color primario
        primary: {
            main: '#262254'
        },
        secundary: {
            main: '#543884'
        },
        error: {
            // esto es una intencidad d colores
            main: red.A400
        }
    }
})