import { Grid, Typography } from "@mui/material"

 
 

export const AuthLayout = ({children, title='' } ) => {
  return (
    // solo utilizo lo que se q puedo reutilizar
    <Grid
      container
      // para el espacio
      spacing={ 0 }
      // esto es como el flexbox
      direction="column"
      alignItems="center"
      justifyContent="center"
      // sx es el style 
      sx={{ 
        minHeight: '100vh', 
        backgroundColor: 'primary.main', 
        padding: 4 }}
    >

      {/* Caja que esta en ek centro */}
      <Grid item
        className="box-shadow"
        // el xs  hace referencia a un tamaño de pantalla en tamaño pequeño va a tener 3 posiciones
        xs={ 3 }
        sx={{
                // aca le digo q solo quiero q se aplique a pantallas medianas
        width: { sm: 450 },
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2
        }}>
        <Typography variant="h5" 
        sx={{  mb: 1 }} >
          {title}
        </Typography>

{/* aca va el contenido especifico de cada archivo */}
        { children }


        </Grid >
    </Grid >
  )
}
