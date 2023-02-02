import { CircularProgress, Grid } from "@mui/material"

// css completo para mostrar el CircularProgress
export const CheckingAuth = () => {
  return (
    <>
      <Grid
        container
        // para el espacio
        spacing={0}
        // esto es como el flexbox
        direction="column"
        alignItems="center"
        justifyContent="center"
        // sx es el style 
        sx={{
          minHeight: '100vh',
          backgroundColor: 'primary.main',
          padding: 4
        }}
      >

        {/* Caja que esta en ek centro */}
        <Grid container
        // para centrar el CircularProgress
        direction='row'
        justifyContent='center'
  >
            {/* esto es de material ui */}
          <CircularProgress color="warning" />
        </Grid>
      </Grid>
    </>
  )
}
