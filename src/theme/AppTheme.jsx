 

//  sirve para tener el tema y lo relacionado con material ui
 
  import { ThemeProvider } from '@mui/material/styles';
  import  CssBaseline  from '@mui/material/CssBaseline';
import { purpleTheme } from './purpleTheme';
 
 
export const AppTheme = ( { children } ) => {
  return (
    <ThemeProvider theme={ purpleTheme }>
    {/* CssBaseline inicia una línea de base elegante, consistente y simple para construir */}
    <CssBaseline />
    { children }
  </ThemeProvider>
  )
}
